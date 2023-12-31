const bcrypt = require("bcryptjs");
import Tokens from "../Models/Tokens";
import express, { NextFunction, Request, Response } from "express";
import { ses, senderEmail } from "../util/emails";

const SALT_ROUNDS = 10;

type Token = {
    name: String,
    tokens: Object
}

type indToken = {
    coupon: string,
    item_name: string
}


/*
randomToken.ts
This file holds backend functions that deal with hashing and tokens within the project
*/

function generateRandomToken(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) { //pick 8 random characters
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
}

export default async function generateHashedTokens(amount:number, length:number) { // amount of tokens and length of each token
    const hashedTokens:Array<string> = [];
    const nonhashedTokens:Array<string> = [];
  
    for (let i = 0; i < amount; i++) {
      const token = generateRandomToken(length);
      nonhashedTokens.push(token);
      const hashedToken = bcrypt.hashSync(token, SALT_ROUNDS); // salt rounds are the rounds of hashing the bcrypt function applies
      hashedTokens.push(hashedToken);
    }
    return [hashedTokens, nonhashedTokens];
}

async function isTokenInValidTokens(tokensToSearch:Array<indToken>, tokenToMatch:string){
    console.log("Checking whether the following token is valid:" + tokenToMatch)
    for (let i = 0; i < tokensToSearch.length; i++){
        if (tokensToSearch[i].coupon == tokenToMatch){
            return true
        }    
    }
    return false;
}

// export async function useTokenForPlan(token:string, id:number){
//     const typeOfToken = (id == 14) ? "singleTokens":"groupTokens";
    
//     let filter = {};

//     const allHashedTokens:Array<hashedTokensType> = await Tokens.find();
//     const ActualTokens:hashedTokensType = allHashedTokens[0];
//     let searching: Array<Token> = [];

//     if (id == 14){
//         searching = ActualTokens.singleTokens;
//     } else {
//         searching = ActualTokens.groupTokens;
//     }
    
//     let indexer = 0;
//     for (let i = 0; i < searching.length; i++){
//         let isMatch = await bcrypt.compareSync(token?token:"", searching[i]);
//         if (isMatch){
//             indexer = i;
//         }     
//     }

//     const update = { $pull: { [typeOfToken]: searching[indexer] } };
//     const updatedToken = await Tokens.findOneAndUpdate(filter, update, { new:true, runValidators:true});
// }

export const tokenController = {
    checkToken: async (req: Request, res: Response) => { // function that checks whether a token is valid for the right id
        try {
            const userProvidedToken = req.body.token
            const id = req.body.id;
        
            // Find all documents in the collection and get an array of hashed tokens
            const allHashedTokens:Array<Token> = await Tokens.find();

            let matchFound = false;

    
            if (id === 11){
                const specificToken = await Tokens.findOne({name:"CampTokens"})
                if (specificToken != null){
                    matchFound = await isTokenInValidTokens(specificToken.tokens, userProvidedToken);
                }
            }
            
            if (matchFound) {
                console.log("Match Found. Congratulations")
                return res.json({ message: 'Token is valid.' });
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
          } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(500).json({ error: 'Internal server error.' });
          }
    },
    addTokenType: async (req: Request, res: Response) => {
        const addTokenType = new Tokens({
            name: "CampTokens",
            tokens: [{
                coupon: "AFLKIDS100",
                item_name: "$100 Holiday Camp Deal"
            }]
        });
        const createdTokenType = await addTokenType.save();
        res.json(createdTokenType);
    },

}

export async function makeTokenForPlan(id:number, customerEmail:string){
    //create 5 tokens
    const [hashedTokens, newTokens] = await generateHashedTokens(5, 8);
    //add them onto corresponding database
    const typeOfToken = (id == 9) ? "singleTokens":"groupTokens";
    let filter = { };
    hashedTokens.forEach(async (token) => {
        let update = { $push: { [typeOfToken]: token } };
        const updatedToken = await Tokens.findOneAndUpdate(filter, update, { new:true, runValidators:true});
    })  
    //add them to email details.   
    const tokenString = newTokens.join(", ");
    const subject = (id == 9) ? "AFLKIDS 5x 1 on 1 Session Tokens":"AFLKIDS 5x Group Session Tokens";
    const params = {
        Destination: {
            ToAddresses: [customerEmail, "Tomoleary@AFLKids.com.au"]
        },
        Message: {
            Body: {
                Html: { Data: `Thanks for purchasing! <br /><br />Use these five codes at any point in the next 6 months by inputting when you are booking a session. Keep them and cross off each one as you use it. <br />They are <br /><br />${tokenString}<br /><br /> Thanks, <br />AFLKIDS` }
            },
            Subject: { Data: subject }
        },
        Source: senderEmail
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log(`Email sent to ${customerEmail}. Message ID: ${result.MessageId}`);
    } catch (error) {
        console.error(`Error sending email to ${customerEmail}:`, error);
    }
}