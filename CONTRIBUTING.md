# Contributing to PetCare

First off, thank you for considering contributing to PetCare! It's people like you that make PetCare such a great platform for pet adoption and veterinary care.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**
* **Include details about your environment** (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some examples of how this enhancement would be used**

### Pull Requests

* Fill in the required template
* Follow the JavaScript style guide
* Include comments in your code where necessary
* Update documentation as needed
* Test your changes thoroughly

## Development Setup

### Prerequisites

* Node.js >= 16.x
* npm or yarn
* Git

### Frontend Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd petcareshops-1

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start development server
npm run dev
```

## Coding Guidelines

### JavaScript Style Guide

* Use ES6+ features where appropriate
* Use async/await for asynchronous code
* Use meaningful variable names
* Keep functions small and focused
* Add comments for complex logic

### Vue Components

* Use Composition API (`<script setup>`)
* Use TypeScript for new components when possible
* Follow single responsibility principle
* Keep templates clean and use computed properties

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Testing

* Write tests for new features
* Ensure all tests pass before submitting PR
* Aim for good test coverage

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
petcareshops-1/
├── src/                    # Frontend source code
│   ├── components/        # Vue components
│   ├── pages/            # Page components
│   ├── stores/           # Pinia stores
│   ├── config/           # Configuration files
│   ├── layouts/          # Layout components
│   └── main.js           # Application entry point
├── backend/               # Backend source code
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middlewares/  # Express middlewares
│   │   ├── routes/       # Route definitions
│   │   └── services/     # Business logic
│   └── package.json
├── .env.example          # Environment variables template
├── package.json          # Frontend dependencies
└── README.md
```

## Deployment

### Frontend

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Questions?

Feel free to open an issue with the "question" label for any questions about contributing.

Thank you for contributing to PetCare! 🐾
