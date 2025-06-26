const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
    attendee: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receive_amount: {
        type: Number,
        required: true
    },
    number_of_book_slots: {
        type: Number,
        default: 1
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Event"
    },
    isConfirm: {
        type: Boolean,
        default: true
    },
    isCancel: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = model("booking", bookingSchema);