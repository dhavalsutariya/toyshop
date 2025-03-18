# ToyShop

ToyShop is a simple React application that allows users to manage a list of toys, including adding and removing toys, with email notifications sent via AWS SES when a new toy is added. The app leverages AWS Amplify for backend services, including API Gateway (REST), AppSync (GraphQL), and Lambda.

## Features
- Add a toy with a name and price.
- Remove individual toys or clear all toys.
- Fetch and display the list of toys from AWS AppSync.
- Send an email notification via AWS SES when a new toy is added.
- Responsive UI with a clean design.

## Tech Stack
- **Frontend**: React 19, AWS Amplify UI React
- **Backend**: AWS Amplify, API Gateway (REST), AppSync (GraphQL), Lambda, SES
- **Dependencies**: 
  - `@aws-amplify/api`
  - `@aws-sdk/client-ses`
  - `react-scripts` (Create React App)

## Prerequisites
- Node.js (v16 or later recommended)
- npm or Yarn
- AWS account with Amplify CLI configured
- SES configured with verified email identities (for sender and recipient)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/toyshop.git
cd toyshop
