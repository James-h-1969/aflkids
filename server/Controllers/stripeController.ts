import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
import Camp from "../Models/Camp";
import Coach from "../Models/Coach";
import generateHashedTokens, {hashedTokensType} from "../util/randomToken";
import Tokens from "../Models/Tokens";
import Product from "../Models/Product";
import { ses, senderEmail } from "../util/emails";
import { useTokenForPlan } from "../util/randomToken"

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

export type Parent = {
    parentname: String,
    email: String,
    phone: String,
    childNames: Array<string>,
    childAge: Array<string>,
    childClubs: Array<string>,
    childComments: Array<string>,
    childEvents: Array<Array<string>>, // this will be a 2D list representing each child and then a list of each event they have done
}

type details = {
    childName: string,
    childAge: string,
    childComments: string,
    childClub: string,
    purchaseName: string,
}

interface Item {
    id: number;
    quantity: number;
    details: Array<details>
}

const storeItems = new Map([
    [1, { priceInCents: 3499, name:"Hoodie" }],
    [2, { priceInCents: 2499, name: "Training Shirt"}],
    [3, { priceInCents: 8000, name: "1 on 1 Private"}],
    [4, { priceInCents: 11000, name: "2 on 1 Private"}],
    [5, { priceInCents: 14000, name: "3 on 1 Private"}],
    [6, { priceInCents: 17000, name: "4 on 1 Private"}],
    [7, { priceInCents: 20000, name: "5 on 1 Private"}],
    [8, { priceInCents: 23000, name: "6 on 1 Private"}],
    [9, { priceInCents: 37500, name: "1 on 1 Private Plan"}],
    [10, { priceInCents: 50000, name: "Group Private Plan"}],
    [11, { priceInCents: 15000, name: "Holiday Camp"}], 
    [12, { priceInCents: 4000, name: "1 Academy Prep Session"}],
    [13, { priceInCents: 13000, name: "4 Academy Prep Sessions"}],
    [14, { priceInCents: 50, name: "1 on 1 Private (Plan)"}],
    [15, { priceInCents: 50, name: "Group Private (Plan)"}],
    [16, { priceInCents: 10000, name: "Holiday Camp (1 day)"}], 
    [17, { priceInCents: 10000, name:"$100 Discounted Camp"}],
])

async function doesCustomerExist(customerEmail:string, customerName:string){
    let existingCustomer = await stripe.customers.list({ email: customerEmail, limit: 1 });
    if (existingCustomer.data.length > 0) {
        return existingCustomer.data[0];
    } else {
        // Customer with the provided email does not exist, create a new customer
        const newCustomer = await stripe.customers.create({
            email: customerEmail,
            name: customerName,
        });
        return newCustomer;
    }
}

async function addChildToCamp(name:string, id:number, details:Object, index:number, day:string){
    const filter =  { name: name };
    let update = {};
    if (id == 11 || id == 17){ //holiday camp 
        update = { $push: {kidsDay1: details, kidsDay2: details }};
    } else {
        if (day === "1"){
            update = { $push: {kidsDay1: details} };
        } else if (day === "2") {
            update = { $push: {kidsDay2: details} };
        }
    }  
    try {
        const updatedCamp = await Camp.findOneAndUpdate(filter, update, { new:true, runValidators:true});
        console.log("Successfully updated the camp")
    } catch (error) {
        console.error("Error updating camp:", error);
    }
}

async function makeTokenForPlan(id:number, customerEmail:string){
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



export const stripeController = {
    createSession: async (req: Request, res: Response) => { //function for handling when a payment session is beginning
        try {
            const customerName = req.body.customerName;
            const customerEmail = req.body.customerEmail;

            let customer = await doesCustomerExist(customerEmail, customerName);
            let items = JSON.stringify(req.body.items);

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                customer: customer.id,
                phone_number_collection: {
                    enabled: true,
                },
                line_items: (req.body.items as Item[]).map(item => {
                    const storeItem = storeItems.get(item.id);
                    return {
                        price_data: {
                            currency: "aud",
                            product_data: {
                                name: storeItem?.name,
                            },
                            unit_amount: storeItem?.priceInCents
                        },
                        quantity: item.quantity
                    };
                }),
                success_url: `${process.env.FRONT_URL}/finished`, // Replace this with your server route or function
                cancel_url: `${process.env.FRONT_URL}`,
                payment_intent_data: {
                    metadata: {
                      cartItems: items
                    },
                  },
            });

            res.json({ url: session.url });
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    },
    handleSuccessfulPayment: async (request: Request, response: Response) => { //function for successful payment
        const sig = request.headers['stripe-signature'];
        try {
          const event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_ENDPOINT_KEY);
      
          const data = event.data.object;
          const eventType = event.type;
     
          // Handle the event
          if (eventType === "payment_intent.succeeded") {
            const customerId = data.customer;
            const customer = await stripe.customers.retrieve(customerId);
            const customerEmail = customer.email;

            const parent = {
                parentname: "placeholder till james figures it out",
                email: customerEmail,
                phone: "another placeholder"
            }
    
            const { metadata } = data; //potentially grab parent name and email here?
            const cartItems = metadata.cartItems;
            const JSONStuff = JSON.parse(cartItems);
       
            JSONStuff.forEach(async (val:Item) => {
                let index = 0;
                const detailsOfKid = val.details[index];
                while (index < val.details.length){            
                    if (val.id == 11 || val.id == 16 || val.id == 17){ //holiday camp 2 day or 1 day
                        const campKidDetails = {
                            childName: detailsOfKid.childName,
                            childAge: detailsOfKid.childAge,
                            childComments: detailsOfKid.childComments,
                            childClub: detailsOfKid.childClub,
                            purchaseName: detailsOfKid.purchaseName,
                            parent: parent
                        }
                        const addingCamp = await addChildToCamp(detailsOfKid.purchaseName[0], val.id, campKidDetails, index, detailsOfKid.purchaseName[1]);
                    } else if (val.id == 9 || val.id == 10){ //buying tokens
                        const makingTokensForPlan = await makeTokenForPlan(val.id, customerEmail);                   
                    } else if (val.id == 14 || val.id == 15){ //using tokens
                        const usingTokensForPlan = await useTokenForPlan(val.details[index].purchaseName[3], val.id);
                    }
                    index++;
                    }
                });
                    
            const theyBoughtPromises = JSONStuff.map(async (val: Item) => {
                let item = await Product.findOne({ id: val.id });
                let details = JSON.stringify(val.details);
                return `${item?.name} : ${details}`;
            });
            
            const theyBoughtArray = await Promise.all(theyBoughtPromises);
            const theyBought = theyBoughtArray.join(",<br /><br />");
      
            let emailList = ["Tomoleary@aflkids.com.au"];
            
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
            response.status(200).send('Received').end();
          
          }
        
        } catch (err) {
          if (err instanceof Error) {
            console.log(`Webhook Error: ${err.message}`);
            response.status(400).send(`Webhook Error: ${err.message}`);
          } else {
            // Handle other types of errors or non-Error objects
            console.error('Unexpected error occurred:', err);
            response.status(500).send('Unexpected error occurred.');
          }
        }
    }
}