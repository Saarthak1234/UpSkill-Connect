
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      userName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      adminType :{
        type: String,
        required: true,
        enum: ["mentee", "mentor"],
      },
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.model("User", userSchema);
  export default User;
