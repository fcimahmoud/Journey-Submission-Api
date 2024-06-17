# Journey Submission API

This is a simple Express.js application that provides an API endpoint for users to submit their journey requests. The application sends email notifications to a company email address and also sends a confirmation email to the user.

## Features

- Receive user journey data (name, email, number of people, destination)
- Validate required data
- Send email to company with user journey details
- Send confirmation email to user
- Handle errors and provide appropriate responses

## Getting Started

### Prerequisites

- Node.js and npm installed on your system
- A Gmail account (or any other email service) with the necessary credentials

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/fcimahmoud/Journey-Submission-Api.git
   ```

2. Navigate to the project directory:

   ```
   cd journey-submission-api
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Update the following variables in the code with your actual values:

   - `companyEmail`: The email address of the company receiving the journey submissions
   - `senderEmail`: The email address used to send the email notifications
   - `senderPassword`: The password for the `senderEmail` account

5. Start the server:

   ```
   npm start
   ```

   The server will start running on `http://localhost:3000`.

## API Endpoint

**POST /submit-journey**

- **Request Body**:
  - `name`: The name of the user submitting the journey
  - `email`: The email address of the user
  - `numPeople`: The number of people included in the journey
  - `place`: The destination of the journey
- **Response**:
  - Success: `Journey submitted successfully!`
  - Error (missing required data): `Missing required data`
  - Error (email sending failure): `Error sending email to company` or `Error sending confirmation email`

