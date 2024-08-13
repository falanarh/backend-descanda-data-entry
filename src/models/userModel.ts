import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  namaLengkap: string;
  email: string;
  password: string;
  peran: 'admin' | 'pcl' | 'pml';
  isSendEmail: boolean;
}

const UserSchema: Schema = new Schema({
  namaLengkap: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  peran: { 
    type: String, 
    enum: ['admin', 'pcl', 'pml'], // Specify allowed values for `peran`
    required: true 
  },
  isSendEmail: { type: Boolean, default: false },
});

export { IUser };
export default mongoose.model<IUser>('User', UserSchema);
