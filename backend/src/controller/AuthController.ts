// controllers/AuthController.ts

import { Request, Response } from 'express';
import User from '../model/user_model';
import jwt from 'jsonwebtoken';
import config from 'config'
import bcrypt from 'bcrypt';
const secret_key = config.get("secret_key")as string;

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
      console.error('Error while saving user:', error.message);
      res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, secret_key, { expiresIn: '1h' });
    const name=user.name
    res.json({ success: true,token:token,name: name,email:email});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
