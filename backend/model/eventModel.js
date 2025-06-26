const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
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
        type: String,
        required: true,
        unique: true
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
        require: true
    },
    isCancel: {
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
        type: String,
        default: "Comming Soon"
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true });

module.exports = model("Event", eventSchema);