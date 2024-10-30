import mongoose from "mongoose";
import bcrypt from "bcrypt"

/** USER SCHEMA MODEL **/
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    mobile: {
        type: String,
        trim: true,
        default: null
    }
}, {timestamps: true})

/** ENCRYPT USER PASSWORD **/
UserSchema.pre('save', async function(next) {
    const encrypted_password = await bcrypt.hash(this.password.toString(), 12)
    this.password = encrypted_password
    next()
})

export const UserModel = new mongoose.model('User', UserSchema)