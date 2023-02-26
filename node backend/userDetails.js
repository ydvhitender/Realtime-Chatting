import mongoose from "mongoose";

const UserDetailsScehma = mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

// mongoose.model("UserInfo", UserDetailsScehma);
export default mongoose.model("UserInfo", UserDetailsScehma);
