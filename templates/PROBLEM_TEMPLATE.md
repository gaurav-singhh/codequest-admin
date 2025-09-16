# Problem Template

Use this template when submitting a new problem to CodeQuest.

## Directory Structure

Your problem submission should follow this structure:

```
problem-submissions/your-problem-name/
├── Problem.md          # Problem statement (this file)
├── Structure.md        # Problem metadata and function signature
└── tests/              # Test cases
    ├── input1.txt      # First test input
    ├── output1.txt     # First test output
    ├── input2.txt      # Second test input
    ├── output2.txt     # Second test output
    └── ...             # More test cases
```

## File Templates

### Problem.md Template

```markdown
# [Problem Name]

## Description

Write a clear and detailed description of the problem. Include:
- What the problem is asking for
- Any background context needed
- Clear explanation of the task

## Input Format

Describe the input format clearly:
- First line contains...
- Second line contains...
- etc.

## Output Format

Describe the expected output format:
- Print the result as...
- Output should be...

## Examples

### Example 1
**Input:**
```
[sample input]
```

**Output:**
```
[sample output]
```

**Explanation:**
[Explain why this output is correct]

### Example 2
(Include multiple examples if helpful)

## Constraints

- List all constraints clearly
- 1 ≤ n ≤ 10^5
- 1 ≤ arr[i] ≤ 10^9
- etc.

## Notes

Any additional notes or hints (optional)
```

### Structure.md Template

```markdown
# Problem Structure Definition

Problem Name: "Your Problem Name"
Function Name: yourFunctionName

## Input Structure:
Input Field: int n
Input Field: list<int> arr

## Output Structure:
Output Field: int result

## Constraints:
- 1 ≤ n ≤ 10^5
- 1 ≤ arr[i] ≤ 10^9

## Time Limit: 
2 seconds

## Memory Limit: 
256 MB
```

## Supported Types

When defining Input/Output Fields in Structure.md, use these types:

### Primitive Types:
- `int` - Integer numbers
- `float` - Decimal numbers
- `string` - Text strings
- `bool` - Boolean (true/false)

### List Types:
- `list<int>` - List of integers
- `list<float>` - List of decimal numbers
- `list<string>` - List of strings
- `list<bool>` - List of booleans

## Test Cases Guidelines

### Test File Naming:
- `input1.txt`, `output1.txt` - First test case
- `input2.txt`, `output2.txt` - Second test case
- Continue numbering: `input3.txt`, `output3.txt`, etc.

### Test Case Quality:
1. **Edge Cases**: Include minimum/maximum constraint values
2. **Corner Cases**: Empty inputs, single elements, etc.
3. **Typical Cases**: Normal expected inputs
4. **Stress Tests**: Large inputs within constraints

### Test File Format:
- Each input file should contain exactly what the problem description specifies
- Output files should contain only the expected result
- No extra whitespace or formatting

## Example Problem Submission

See the existing problems in the main repository for examples:
- `two-sum/` - Simple array problem
- `max-element/` - Array processing
- `classroom/` - String manipulation

## Submission Process

1. Fork the `codequest-admin` repository
2. Create your problem directory under `problem-submissions/`
3. Follow the template structure exactly
4. Submit a Pull Request
5. Automated validation will check your submission
6. Maintainer review and approval
7. Automatic deployment to the web application

## Validation Checklist

Before submitting, ensure:

- [ ] `Problem.md` exists and is well-written
- [ ] `Structure.md` follows the exact format
- [ ] `tests/` directory contains paired input/output files
- [ ] Test files follow naming convention (input1.txt, output1.txt, etc.)
- [ ] All test files contain valid content
- [ ] Function name in Structure.md is a valid identifier
- [ ] All required fields are present in Structure.md
- [ ] Problem description is clear and includes examples
- [ ] Constraints are specified

## Tips for Good Problems

1. **Clear Problem Statement**: Make sure anyone can understand what's being asked
2. **Good Examples**: Include examples that cover different scenarios
3. **Appropriate Difficulty**: Match the difficulty to your target audience
4. **Efficient Solution Exists**: Ensure there's a solution within time/memory limits
5. **Unique Content**: Avoid duplicating existing problems

## Getting Help

If you need help with your submission:
1. Check existing problems for examples
2. Open an issue in the admin repository
3. Join our Discord community (link in main repository)

Thank you for contributing to CodeQuest! 🚀