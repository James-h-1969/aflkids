import mongoose from "mongoose";

const Schema = mongoose.Schema;

type DateArray = {
    [date: string]: string[];
}

const AcademySchema = new Schema({
    name:String,
    time:String,
    start:String,
    Location:String,
    dates: Object
})

const AcademyModel = mongoose.model("Academy", AcademySchema);

export default AcademyModel;