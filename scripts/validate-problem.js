const fs = require('fs');
const path = require('path');

/**
 * Validate a problem submission
 * @param {string} problemPath - Path to the problem directory
 */
function validateProblem(problemPath) {
  console.log(`🔍 Validating problem at: ${problemPath}`);
  
  const errors = [];
  const warnings = [];
  
  // Check if directory exists
  if (!fs.existsSync(problemPath)) {
    errors.push(`Problem directory does not exist: ${problemPath}`);
    return { success: false, errors, warnings };
  }
  
  // Check required files
  const requiredFiles = ['Problem.md', 'Structure.md'];
  const requiredDirs = ['tests'];
  
  for (const file of requiredFiles) {
    const filePath = path.join(problemPath, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing required file: ${file}`);
    } else {
      console.log(`✅ Found ${file}`);
    }
  }
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(problemPath, dir);
    if (!fs.existsSync(dirPath)) {
      errors.push(`Missing required directory: ${dir}`);
    } else {
      console.log(`✅ Found ${dir} directory`);
    }
  }
  
  // Validate Structure.md format
  const structurePath = path.join(problemPath, 'Structure.md');
  if (fs.existsSync(structurePath)) {
    const structureContent = fs.readFileSync(structurePath, 'utf-8');
    validateStructureFormat(structureContent, errors, warnings);
  }
  
  // Validate test files
  const testsPath = path.join(problemPath, 'tests');
  if (fs.existsSync(testsPath)) {
    validateTestFiles(testsPath, errors, warnings);
  }
  
  // Validate Problem.md
  const problemMdPath = path.join(problemPath, 'Problem.md');
  if (fs.existsSync(problemMdPath)) {
    validateProblemMd(problemMdPath, errors, warnings);
  }
  
  // Print results
  console.log(`\n📊 Validation Results for ${path.basename(problemPath)}:`);
  console.log(`✅ Checks passed: ${Math.max(0, 6 - errors.length)}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(error => console.log(`  - ${error}`));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  const success = errors.length === 0;
  console.log(`\n${success ? '🎉 Validation PASSED' : '💥 Validation FAILED'}`);
  
  return { success, errors, warnings };
}

function validateStructureFormat(content, errors, warnings) {
  const requiredFields = [
    'Problem Name:',
    'Function Name:',
    'Input Structure:',
    'Output Structure:'
  ];
  
  for (const field of requiredFields) {
    if (!content.includes(field)) {
      errors.push(`Structure.md missing required field: ${field}`);
    }
  }
  
  // Check for input/output fields
  const hasInputField = content.includes('Input Field:');
  const hasOutputField = content.includes('Output Field:');
  
  if (!hasInputField) {
    errors.push('Structure.md missing Input Field definitions');
  }
  
  if (!hasOutputField) {
    errors.push('Structure.md missing Output Field definitions');
  }
  
  // Extract problem name and function name for additional validation
  const problemNameMatch = content.match(/Problem Name:\s*"([^"]+)"/);
  const functionNameMatch = content.match(/Function Name:\s*(\w+)/);
  
  if (!problemNameMatch) {
    errors.push('Problem Name must be in quotes in Structure.md');
  }
  
  if (!functionNameMatch) {
    errors.push('Function Name must be a valid identifier in Structure.md');
  } else {
    const functionName = functionNameMatch[1];
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(functionName)) {
      errors.push('Function Name must be a valid identifier (letters, numbers, underscore)');
    }
  }
}

function validateTestFiles(testsPath, errors, warnings) {
  const files = fs.readdirSync(testsPath);
  
  // Check for input/output file pairs
  const inputFiles = files.filter(f => f.startsWith('input') && f.endsWith('.txt'));
  const outputFiles = files.filter(f => f.startsWith('output') && f.endsWith('.txt'));
  
  if (inputFiles.length === 0) {
    errors.push('No input test files found (should be input1.txt, input2.txt, etc.)');
  }
  
  if (outputFiles.length === 0) {
    errors.push('No output test files found (should be output1.txt, output2.txt, etc.)');
  }
  
  if (inputFiles.length !== outputFiles.length) {
    warnings.push(`Mismatch between input files (${inputFiles.length}) and output files (${outputFiles.length})`);
  }
  
  // Validate file naming pattern
  for (let i = 1; i <= Math.max(inputFiles.length, outputFiles.length); i++) {
    const inputFile = `input${i}.txt`;
    const outputFile = `output${i}.txt`;
    
    if (inputFiles.includes(inputFile) && !outputFiles.includes(outputFile)) {
      errors.push(`Missing output file: ${outputFile} (corresponding to ${inputFile})`);
    }
    
    if (outputFiles.includes(outputFile) && !inputFiles.includes(inputFile)) {
      errors.push(`Missing input file: ${inputFile} (corresponding to ${outputFile})`);
    }
  }
  
  // Check file contents are not empty
  for (const file of [...inputFiles, ...outputFiles]) {
    const filePath = path.join(testsPath, file);
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    if (content.length === 0) {
      warnings.push(`Test file is empty: ${file}`);
    }
  }
  
  console.log(`✅ Found ${inputFiles.length} input files and ${outputFiles.length} output files`);
}

function validateProblemMd(problemMdPath, errors, warnings) {
  const content = fs.readFileSync(problemMdPath, 'utf-8');
  
  if (content.trim().length < 100) {
    warnings.push('Problem.md seems very short - consider adding more detailed explanation');
  }
  
  // Check for basic sections
  const hasDescription = content.toLowerCase().includes('description') || content.toLowerCase().includes('problem');
  const hasExamples = content.toLowerCase().includes('example');
  const hasConstraints = content.toLowerCase().includes('constraint');
  
  if (!hasDescription) {
    warnings.push('Problem.md should include a problem description section');
  }
  
  if (!hasExamples) {
    warnings.push('Problem.md should include example inputs and outputs');
  }
  
  if (!hasConstraints) {
    warnings.push('Problem.md should include constraints section');
  }
}

// CLI usage
if (require.main === module) {
  const problemPath = process.argv[2];
  
  if (!problemPath) {
    console.error('Usage: node validate-problem.js <problem-path>');
    console.error('Example: node validate-problem.js problem-submissions/my-problem');
    process.exit(1);
  }
  
  const result = validateProblem(problemPath);
  process.exit(result.success ? 0 : 1);
}

module.exports = { validateProblem };