import mongoose from 'mongoose';
import crypto from 'crypto';

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

// userSchema.methods.checkPassword = function(password: any) {
//   if (!password) {
//     return false;
//   }
//   if (!this.hash) {
//     return false;
//   }

//   return (
//     crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') ==
//     this.hash
//   );
// };

const user = mongoose.model('user', userSchema);
export default user;
