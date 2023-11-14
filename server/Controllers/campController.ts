import Camp from "../Models/Camp";
import express, { NextFunction, Request, Response } from "express";

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
        console.log()
    },
    deleteCamp:  async (req: Request, res: Response) => {
        const {name_} = req.body;
        Camp.deleteOne({ name: name_ }, (err:Error) => {
            if (err) {
            console.error('Error deleting camp:', err);
            } else {
            console.log(`Successfully deleted camp with name: ${name_}`);
            }
        });
    },

    
}