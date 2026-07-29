import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/auth.model.js";

const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "Invalid credentials",
      success: false,
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        msg: "User already created",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN);

    return res.status(201).json({
      msg: "Account created successfully",
      success: true,
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server side error",
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Invalid credential",
      success: false,
    });
  }

  try {
    const FindUser = await UserModel.findOne({ email });

    if (!FindUser) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    const isMatchPassword = await bcrypt.compare(password, FindUser.password);

    if (!isMatchPassword) {
      return res
        .status(401)
        .json({ msg: "Password are not matched", success: false });
    }

    const token = await jwt.sign({ id: FindUser._id }, process.env.JWT_TOKEN);

    return res.status(200).json({
      msg: "User login successfully",
      success: true,
      user: FindUser,
      token,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res
      .status(500)
      .json({ msg: "Server side error", error, success: false });
  }
};

const SetAddress = async (req, res) => {
  const { area, city, state, pincode } = req.body;
  const { id } = req.params;

  try {
    const setAddress = await UserModel.findByIdAndUpdate(
      id,
      { address: { area, city, state, pincode } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!setAddress) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    return res
      .status(200)
      .json({ msg: "Address add successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Server side error", error, success: false });
  }
};

export default { Signup, Login, SetAddress };
