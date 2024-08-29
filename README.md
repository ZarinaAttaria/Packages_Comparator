# NPM Packages Comparator

![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-green)
![React Version](https://img.shields.io/badge/react-17.0.2-blue)
![TypeScript](https://img.shields.io/badge/typescript-4.3.5-blue)
![Ant Design](https://img.shields.io/badge/ant--design-4.16.13-red)
![Last Commit](https://img.shields.io/github/last-commit/ZarinaAttaria/Packages_Comparator)

## Description

The NPM Packages Comparator is a web application that allows users to search, compare, and receive recommendations for npm packages based on various key data points. This tool helps developers choose the best package for their project needs.

## Features

### Search and Compare

- **Search Box**: Users can search for npm packages by keyword.
- **Package Selection**: Users can independently search and select up to as many packages as they want.
- **Package Suggestions**: As users type in the search box, package suggestions are displayed.

### Recommender

- **Recommendation**: Based on the comparison results, the app recommends the best package.
- **Comparison Table**: A table displays key data points for packages.
- **Downloads Comparison**: Users can compare the number of downloads between the selected packages.
- **Final Recommendation**: The recommendation is based on a weighted percentage:
  - 20% Community Interest
  - 50% Downloads
  - 30% Tests and Carefulness

## Success Metrics

- A complete UI of the application built using React with a focus on good UX.
- Following best practices for React and JavaScript.
- Integration with npm/GitHub APIs to retrieve package data.
- Analyzing packages by comparing key data points.
- Deploying the app on Vercel.

## Stretched Goals

- Adding unit tests.
- Adding integration tests.
- Ensuring mobile screen responsiveness.

## Tech Stack

- **Frontend**: React, JavaScript, redux
- **UI Framework**: Ant Design
- **Charts**: Ant Design Charts
- **Styling**: CSS

## Installation

To run this app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ZarinaAttaria/Packages_Comparator.git
   ```

2. Executing the project:
   npm run dev
   npm install
