const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { config } = require("dotenv");
config();

const app = express();
const port = process.env.PORT;

// Replace with your company email and credentials
const companyEmail = process.env.COMPANYEMAIL;
const senderEmail = process.env.SENDEREMAIL;
const senderPassword = process.env.SENDERPASSWORD;

// Configure email transporter
const transporter = nodemailer.createTransport({
	service: 'gmail', // Update if using different service
	auth: {
    	user: senderEmail,
    	pass: senderPassword,
	},
});

// Parse incoming request body data
app.use(bodyParser.json());

// API endpoint to receive user data
app.post('/submit-journey', (req, res) => {
	const { name, email, numPeople, place } = req.body;

	// Check for required data
	if (!name || !email || !numPeople || !place) {
		return res.status(400).send('Missing required data');
	}

	// Compose email content for company
	const companyEmailContent = `
		New journey submission:

		Name: ${name}
		Email: ${email}
		Number of People: ${numPeople}
		Place: ${place}
	`;

	// Compose confirmation email content for user
	const userEmailContent = `
		Dear ${name},

		Thank you for submitting your journey request for ${place} with ${numPeople} people.

		We will be in touch shortly to confirm your booking.

		Regards,

		The Tourism Company
	`;

	// Send email to company
	const companyEmailOptions = {
		from: senderEmail,
		to: companyEmail,
		subject: 'New Journey Submission',
		text: companyEmailContent,
	};

	transporter.sendMail(companyEmailOptions, (error, info) => {
		if (error) {
		console.error(error);
		return res.status(500).send('Error sending email to company');
		}
		console.log('Email sent to company:', info.response);
	});

	// Send confirmation email to user
	const userEmailOptions = {
		from: senderEmail,
		to: email,
		subject: 'Journey Submission Confirmation',
		text: userEmailContent,
	};

	transporter.sendMail(userEmailOptions, (error, info) => {
		if (error) {
		console.error(error);
		return res.status(500).send('Error sending confirmation email');
		}
		console.log('Confirmation email sent to user:', info.response);
		res.send('Journey submitted successfully!');
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
