import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// export interface IUser extends mongoose.Document {
//   displayName: String;
//   email: string;
//   hash: { type: String };
//   salt: String;
// }

const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: String,
  email: { type: String },
  hash: { type: String },
  salt: String,
});

userSchema.methods.setPassword = function(password: any) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};
userSchema.methods.checkPassword = function(password: any) {
  if (!password) {
    return false;
  }
  if (!this.hash) {
    return false;
  }
  return (
    crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex') == this.hash
  );
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expireDate = new Date(today).setDate(today.getDate() + 1);
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: new Date(expireDate).getTime() / 1000,
    },
    process.env.jwtSecret,
  );
};

const user = mongoose.model('user', userSchema);
export default user;
