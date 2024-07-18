
import connectMongo from "@/libs/mongoose";
import { NextResponse, NextRequest } from "next/server";
import Razorpay from 'razorpay';
const shortid = require("shortid");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});


// Handler for GET requests to fetch product by _id
export async function POST(req: NextRequest) {

    const body = await req.json();

    try {
        await connectMongo();
        const payment_capture = 1;
        const currency = "INR";
        const options = {
            amount: (body.amount).toString(),
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        },
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}
