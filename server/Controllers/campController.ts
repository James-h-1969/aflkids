import Camp from "../Models/Camp";
import express, { NextFunction, Request, Response } from "express";
import { sendEmail } from "../util/emails"

export const campController = {
    getCamps: async (req: Request, res: Response) => { //function that gets all of the current camps avaialbe 
        const camps = await Camp.find();
        res.json(camps);
    },
    addCamp: async (req: Request, res: Response) => { //function that adds a new camp into the backend
        const {name_, ages_, date_, times_, Price_, Location_, address_, locPic_} = req.body;
        const newCamp = new Camp({
            name: name_,
            ages: ages_,
            date: date_,
            times: times_,
            Price: Price_,
            Location: Location_,
            address: address_,
            locPic: locPic_,
            kidsDay1: [],
            kidsDay2: [],
            archived: false
        });
        const createdCamp = await newCamp.save();
        res.json(createdCamp);
    },
    changeArchive: async (req: Request, res: Response) => { //function that changes whether a camp is archived or not
        const {name_, archived_} = req.body;
        const filter = { name: name_ }
        const update = { $set: { archived: archived_ } };
        const updatedToken = await Camp.findOneAndUpdate(filter, update, { new:true, runValidators:true});
    },
    deleteCamp:  async (req: Request, res: Response) => {
        const {name_} = req.body;
        const waiting = await Camp.deleteOne({ name: name_ });
    },
    updateCamp: async (req: Request, res: Response) => {
        const {name_, ages_, date_, times_, Location_, address_, locPic_, oldName} = req.body;
        console.log(`Currently Updating: ${name_}`)

        const filter = { name: oldName }
        const update = { $set: {
            name: name_,
            ages: ages_,
            date: date_,
            times: times_,
            Location: Location_,
            address: address_,
            locPic: locPic_
        }}
        const updatingCamp = await Camp.findOneAndUpdate(filter, update, { new:true, runValidators:true});
    },
    emailCamp: async (req: Request, res: Response) => {
        const {campname_} = req.body;
        console.log(`\nCurrently Emailing all parents in: ${campname_}`);
        const campToEmail = await Camp.findOne({name: campname_});
        let parentList:string[] = [];
        // go through day one and day 2 and get all the parents into a list
        campToEmail?.kidsDay1.forEach(val => {
            let parent = val.parent.email;
            if (!parentList.includes(parent)){
                parentList.push(parent)
            }
        })
        campToEmail?.kidsDay2.forEach(val => {
            let parent = val.parent.email;
            if (!parentList.includes(parent)){
                parentList.push(parent)
            }
        })
        // console.log(parentList)
        // FIGURE OUT THE EMAIL WORKING FOR SENDING TO JAMES HOCKING
        let sendingTo = process.env.STATUS == "dev" ? ["jameshocking542@gmail.com"] : [] //parentList    (CHANGE THIS WHEN CONFIDENT)

        const emailing = await sendEmail(sendingTo, `Hi from the team at AFLKids!<br /><br />We are just reminding you about the upcoming ${campname_}. We are excited to see you and your child(s) there! <br /><br />Regards, AFLKIDS`, "REMINDER: Aflkids session soon!")
    }

    
}