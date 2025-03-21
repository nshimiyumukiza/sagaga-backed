import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create user

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ message: "user created succefully.", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(403).json({ message: "Email Not Found." });
    } else {
      const comperePassword = bcrypt.compareSync(password, user.password);
      if (!comperePassword) {
        return res.status(403).json({ message: "passord not found" });
      } else {
        const token = jwt.sign({ user: user }, process.env.SCRETKEY, {
          expiresIn: "1d",
        });
        res
          .status(201)
          .json({ message: `${user.name} Login Successfully.`, token });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get user

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res
      .status(200)
      .json({ message: `you  get all ${user.length} user.`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { createUser, getUser, login };
