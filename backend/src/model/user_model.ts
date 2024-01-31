import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model<UserDocument>('User', userSchema);
