import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  tasks: any[];
  feeds: any[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tasks: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['Pending', 'Completed', 'Done'],
          default: 'Pending',
        },
      },
    ],
    feeds: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        imageUrl: {
          type: String,
          required: true,
        },
        caption: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;