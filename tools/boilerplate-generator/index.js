const fs = require('fs');
const path = require('path');
const { ProblemDefinitionParser } = require('./ProblemDefinitionGenerator');
const { FullProblemDefinitionParser } = require('./FullProblemDefinitionGenerator');

/**
 * Generate boilerplate code for a problem
 * @param {string} problemPath - Path to the problem directory
 */
function generateBoilerplate(problemPath) {
  const structureFilePath = path.join(problemPath, 'Structure.md');
  const boilerplatePath = path.join(problemPath, 'boilerplate');
  const fullBoilerplatePath = path.join(problemPath, 'boilerplate-full');

  if (!fs.existsSync(structureFilePath)) {
    console.error(`Structure.md not found at ${structureFilePath}`);
    return false;
  }

  try {
    // Read the Structure.md file
    const input = fs.readFileSync(structureFilePath, 'utf-8');

    // Generate partial boilerplate
    console.log('Generating partial boilerplate...');
    generatePartialBoilerplate(input, boilerplatePath);

    // Generate full boilerplate
    console.log('Generating full boilerplate...');
    generateFullBoilerplate(input, fullBoilerplatePath);

    console.log(`✅ Boilerplate generated successfully for ${path.basename(problemPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating boilerplate: ${error.message}`);
    return false;
  }
}

function generatePartialBoilerplate(input, boilerplatePath) {
  // Parse the input
  const parser = new ProblemDefinitionParser();
  parser.parse(input);

  // Generate the boilerplate code
  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();

  // Ensure the boilerplate directory exists
  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  // Write the boilerplate code to respective files
  fs.writeFileSync(path.join(boilerplatePath, 'function.cpp'), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.js'), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.rs'), rustCode);
}

function generateFullBoilerplate(input, boilerplatePath) {
  // Parse the input
  const parser = new FullProblemDefinitionParser();
  parser.parse(input);

  // Generate the boilerplate code
  const cppCode = parser.generateCpp();
  const jsCode = parser.generateJs();
  const rustCode = parser.generateRust();

  // Ensure the boilerplate directory exists
  if (!fs.existsSync(boilerplatePath)) {
    fs.mkdirSync(boilerplatePath, { recursive: true });
  }

  // Write the boilerplate code to respective files
  fs.writeFileSync(path.join(boilerplatePath, 'function.cpp'), cppCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.js'), jsCode);
  fs.writeFileSync(path.join(boilerplatePath, 'function.rs'), rustCode);
}

// CLI usage
if (require.main === module) {
  const problemPath = process.argv[2];
  
  if (!problemPath) {
    console.error('Usage: node index.js <problem-path>');
    console.error('Example: node index.js ../../problem-submissions/new-problem');
    process.exit(1);
  }

  const fullPath = path.resolve(problemPath);
  const success = generateBoilerplate(fullPath);
  process.exit(success ? 0 : 1);
}

module.exports = { generateBoilerplate };