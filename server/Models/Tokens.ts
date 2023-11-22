import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const TokensSchema = new Schema({
    name: String,
    tokens: Array
});

const TokenModel = mongoose.model("Token", TokensSchema);

export default TokenModel;