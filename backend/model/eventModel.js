import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    location: {
        type: String,
        required: true,
        trim:true
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
        type: String,
        default:null 
    },
    reporting_time: {
        type: String
    },
    available_slots: {
        type: Number,
        required: true,
        min:0
    },
    total_slots: {
        type: Number,
        required: true,
        min: 1
    },
    per_slot_price: {
        type: Number,
        required: true,
        min:0
    },
    status: {
        type: String,
        enum:[
            "Draft",
            "Published",
            "Cancelled",
            "Completed"
        ],
        default: "Draft"
    },
    cancel_message: {
        type: String,
        trim:true,
        default:""
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
    booking_start: {
        type: Date,
        required:true
    },
    max_booking_per_user:{
        type:Number,
        default:5
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);