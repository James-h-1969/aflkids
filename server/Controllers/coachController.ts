import Coach from "../Models/Coach";
import { Request, Response } from "express";

export const coachController = {
    getCoaches: async (req: Request, res: Response) => {
        const coaches = await Coach.find();
        res.json(coaches);
    },
    addCoach: async (req: Request, res: Response) => {
        const {name_ } = req.body;
        const newCoach = new Coach({
            name:name_,
            role:"AFLKids Coach",
            availableSessions: [],
            bookedSessions: [],
            imgName: ""
        });
        const createdCoach = await newCoach.save();
        res.json(createdCoach);
    },
    deleteCoach:  async (req: Request, res: Response) => {
        const {name_} = req.body;
        const waiting = await Coach.deleteOne({ name: name_ });
    },
    // function for adding a booked session to the coach
    addBookedSession: async (req: Request, res: Response) => {
        const {name_, location_, timing_, kids_, type_ }= req.body; 

        const coach = await Coach.findOne({ name: name_});

        const bookedSession = {
            location: location_,
            timing: timing_,
            kids: kids_,
            type: type_
        }

        coach?.bookedSessions.push(bookedSession);

        const updatedCoach = await coach?.save()
    },
    // function for deleting a booked session with the coach
    deleteBookedSession: async (req: Request, res: Response) => {
        const {name_, timing_} = req.body;

        const coach = await Coach.findOne({ name: name_});

        const sessionIndex = coach?.bookedSessions.findIndex(session => session.timing === timing_);

        if (sessionIndex !== undefined){
            coach?.bookedSessions.splice(sessionIndex, 1);
        }
        const updatedCoach = await coach?.save();

    }
    // deleteSession: async (req: Request, res: Response) => {

    // },

}