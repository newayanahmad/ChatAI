import mongoose from 'mongoose';

let User, FileModel;
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
if (mongoose.models.File) {
    FileModel = mongoose.model('File');
} else {
    const FileSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileName: { type: String },
        fileKey: { type: String, required: true },
        messages: { type: Array, default: [] },
        createdAt: { type: Date, required: true, default: Date.now }
    });

    FileModel = mongoose.model('File', FileSchema);
}

export { User, FileModel };
