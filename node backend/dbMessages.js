import mongoose from "mongoose";

const whastapzSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

export default mongoose.model("messagecontents", whastapzSchema);
