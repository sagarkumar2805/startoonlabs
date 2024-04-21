import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    count : {
        type : Number,
        default : 0
    },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
