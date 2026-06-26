import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,      
    },
    time: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    reporting_time: {
        type: String
    },
    available_slots: {
        type: Number,
        required: true
    },
    per_slot_price: {
        type: Number,
        required: true
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    cancel_message: {
        type: String
    },
    event_category: {
        type: String,
        required: true,
        enum: ["Conference", "Workshop", "Seminar", "Celebration"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    on_booking_start: {
        type: Date,
        default: "Comming Soon"
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);