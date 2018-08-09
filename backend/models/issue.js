import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
    type: {
        type: String,
    },
    language1: {
        type: String,
    },
    language2: {
        type: String,
    },
    difficulty: {
        type: Number,
        default: 5,
    },
    status: {
        type: String,
        default: 'Unlearnt',
    },
});

export default mongoose.model('Issue', Issue);
