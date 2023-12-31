// SETUP EMAILS
import { Response } from "express";
const AWS = require('aws-sdk');
require("dotenv").config();

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-2"
};

export const ses = new AWS.SES(SES_CONFIG);
export const senderEmail = 'jameshocking542@gmail.com'; // Replace with your sender email address

export async function sendEmail(customerEmail:string, theyBought: string, response:Response){
    let emailList = ["Tomoleary@aflkids.com.au"]; // send the email to tom outlining that there was just a purchase
            
    const params = {
        Destination: {
            ToAddresses: emailList,
        },
        Message: {
            Body: {
                Html: { Data: `${customerEmail} just purchased <br /><br />${theyBought}<br /><br />Good stuff.` }
            },
            Subject: { Data: "AFLKIDS PURCHASE!" }
        },
        Source: senderEmail
    };

    try {
        const result = await ses.sendEmail(params).promise();
        response.status(200).send(`Email sent to ${customerEmail}. Message ID: ${result.MessageId}`).end();
    } catch (error) {
        response.status(200).send(`Error sending email to ${customerEmail}: ${error}`).end();
    }
}