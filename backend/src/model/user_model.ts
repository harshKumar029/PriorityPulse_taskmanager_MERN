// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import config from 'config';

// // Define interface for user document
// interface UserDocument extends mongoose.Document {
//     name: string;
//     email: string;
//     password: string;
//     comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const UserSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         password: {
//             type: String,
//             required: true
//         },
//     },
//     { timestamps: true }
// );

// // Used for logging in
// UserSchema.methods.comparePassword = async function (
//     candidatePassword: string
//   ) {
//     const user = this as UserDocument;
  
//     return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
//   };

//   // Use pre-save hook to hash password
// UserSchema.pre<UserDocument>('save', async function(next) {
//     let user = this as UserDocument;
  
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
  
//     // Generate a salt
//     const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
  
//     // Hash the password with the salt
//     const hash = await bcrypt.hash(user.password, salt);
  
//     // Replace the plain text password with the hashed password
//     user.password = hash;
  
//     return next();
// });

// const User = mongoose.model<UserDocument>('User', UserSchema);
// export default User;


// ..............

// models/User.ts

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
