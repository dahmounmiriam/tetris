# BDD Extractor

A tool for extracting Behavior-Driven Development (BDD) scenarios from requirements documents using LangGraph and agents.

## Overview

BDD Extractor analyzes requirements documents in various formats (txt, pdf, docx, xlsx) and extracts BDD scenarios in the Given-When-Then format. It uses LangGraph and specialized agents to identify potential scenarios and convert them into structured BDD format.

## Features

- Support for multiple file formats (txt, pdf, docx, xlsx)
- Intelligent extraction of BDD scenarios using LLM-powered agents
- Output in JSON or Gherkin format
- Advanced multi-agent workflow for improved extraction quality

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/bdd-extractor.git
   cd bdd-extractor
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your API keys:
   ```
   cp .env.example .env
   # Edit .env with your API keys
   ```

## Usage

### Basic Usage

```bash
python main.py path/to/requirements.txt
```

This will extract BDD scenarios from the requirements document and save them to `bdd_scenarios.json`.

### Advanced Options

```bash
# Use the advanced multi-agent extraction
python main.py path/to/requirements.txt --advanced

# Output in Gherkin format
python main.py path/to/requirements.txt --format gherkin

# Specify output file
python main.py path/to/requirements.txt --output my_scenarios.json

# Enable verbose output
python main.py path/to/requirements.txt --verbose
```

## Example

Input:
```
User Story: As a user, I want to log in to the system so that I can access my account.

Acceptance Criteria:
1. When I enter valid credentials, I should be logged in and redirected to the dashboard.
2. When I enter invalid credentials, I should see an error message.
3. When I click "Forgot Password", I should be redirected to the password reset page.
```

Output (JSON):
```json
[
  {
    "feature": "User Authentication",
    "scenarios": [
      {
        "name": "Successful Login",
        "given": "I am on the login page",
        "when": "I enter valid credentials",
        "then": "I should be logged in and redirected to the dashboard"
      },
      {
        "name": "Failed Login",
        "given": "I am on the login page",
        "when": "I enter invalid credentials",
        "then": "I should see an error message"
      },
      {
        "name": "Password Reset",
        "given": "I am on the login page",
        "when": "I click \"Forgot Password\"",
        "then": "I should be redirected to the password reset page"
      }
    ]
  }
]
```

## Project Structure

- `main.py`: Entry point for the application
- `bdd_extractor/`: Main package
  - `file_processor.py`: Handles different file formats
  - `bdd_extraction_graph.py`: Basic LangGraph workflow
  - `advanced_graph.py`: Advanced multi-agent workflow
  - `agents.py`: Specialized agents for BDD extraction
  - `models.py`: Data models for BDD scenarios
  - `utils.py`: Utility functions

## License

MIT
