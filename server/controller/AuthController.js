import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

//signup controler

export const signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(409)
        .json({ success: false, error: "user already exist" });
    }
    const hashPass = bcrypt.hashSync(password, 10);
    const newUser = await User({
      username: username,
      email: email,
      password: hashPass,
    });
    await newUser.save();
    var token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, token: token ,
      _id:newUser._id,
      username:newUser.username
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//login controler

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const ifUser = await User.findOne({ username: username });
    if (ifUser) {
      const checkPass = bcrypt.compareSync(password, ifUser.password);
      if (checkPass) {
        var token = jwt.sign({ id: ifUser._id }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true,
          token: token ,
          _id:ifUser._id,
          username:ifUser.username
        });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Invalid password" });
      }
    } else {
      return res.status(400).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.log(error)
  }
};
