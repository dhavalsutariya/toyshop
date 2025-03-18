const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({ region: 'ca-central-1' });

exports.handler = async (event) => {
  try {
    // Parse the body from the API Gateway event
    const { toyName, toyPrice } = JSON.parse(event.body || '{}');

    const params = {
      Source: 'dhavalksutariya@gmail.com', // Must be SES-verified
      Destination: {
        ToAddresses: ['dhaval07sutariya@gmail.com'], // Must be SES-verified in sandbox mode
      },
      Message: {
        Subject: { Data: 'New Toy Added to ToyShop' },
        Body: {
          Text: { Data: `A new toy has been added: ${toyName} priced at $${toyPrice}` },
        },
      },
    };

    await sesClient.send(new SendEmailCommand(params));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000", // Match your frontend origin
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
      },
      body: JSON.stringify({ message: 'Email sent successfully', toyName, toyPrice }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000", // Include CORS even on error
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
      },
      body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
    };
  }
};