import mongoose from "mongoose";
import toJSON from "../plugins/toJSON";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    razorpayPaymentId: {
        type: String,
        required: true,
        unique: true
    },
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },
    razorpaySignature: {
        type: String,
        required: true,
        unique: true
    },
    audience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    digitalProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DigitalPaymentProduct',
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, });


paymentSchema.plugin(toJSON);

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

