import mongoose from 'mongoose';

let User;

if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    const UserSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        email: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        createdAt: { type: Date, required: true, default: Date.now }
    });

    User = mongoose.model('User', UserSchema);
}

export { User };
