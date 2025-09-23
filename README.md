# CodeQuest Admin - Problem Management System

This repository manages community problem submissions for the CodeQuest competitive programming platform.

## Overview

The Problem Management System automates the process of accepting, validating, and publishing community-contributed problems to the main CodeQuest web application.

## Architecture

### Two-Repository System

- **codequest-admin** (this repo): Handles problem submissions and processing
- **codequest-web**: Main web application that consumes processed problems

### Workflow

1. Community submits problems via PR to this repository
2. GitHub Actions automatically validate problem format
3. Approved problems are processed and synced to the web repository
4. Web application automatically updates with new problems

## Directory Structure

```
codequest-admin/
├── .github/workflows/     # GitHub Actions workflows
├── problem-submissions/   # Incoming problem submissions
├── tools/                 # Processing tools (boilerplate generator, etc.)
├── templates/             # Problem templates and examples
└── scripts/               # Utility scripts
```

## Problem Submission Process

### For Contributors

1. Fork this repository
2. Create a problem following the template in `templates/`
3. Submit a PR with your problem in `problem-submissions/`
4. Automated validation checks run
5. Admin review and approval
6. Automatic sync to web application

### Problem Format

Each problem submission must be in its own directory under `problem-submissions/`, and include:

- `Problem.md` - Problem statement
- `Structure.md` - Metadata and constraints
- `tests/` - Input/output test cases, named as `input1.txt`, `output1.txt`, `input2.txt`, `output2.txt`, etc.
- `boilerplate/` - (Optional) Code templates for supported languages
- `boilerplate-full/` - (Optional) Full solution templates for supported languages

**Directory Naming:** Use descriptive, kebab-case names for problem directories (e.g., `gcd-of-two-numbers`).

See `templates/PROBLEM_TEMPLATE.md` for detailed guidelines.

## Development

```bash
npm install
npm run validate   # Validate a problem
npm run generate   # Generate boilerplate code
```

## GitHub Actions

- **validate-problem.yml**: Validates problem format and test cases
- **process-problem.yml**: Processes approved problems
- **sync-to-web.yml**: Syncs processed problems to web repository

## Contributing

See `templates/PROBLEM_TEMPLATE.md` for submission guidelines.