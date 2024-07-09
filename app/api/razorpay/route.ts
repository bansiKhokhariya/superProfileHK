
import connectMongo from "@/libs/mongoose";
import { NextResponse, NextRequest } from "next/server";
import Razorpay from 'razorpay'


const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

// Handler for GET requests to fetch product by _id
export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();

    try {
        await connectMongo();
        const options = {
            amount: body.amount,
            currency: "INR",
        };

        console.log(options);
        
        const order = await razorpay.orders.create(options);
        return NextResponse.json(
            { order },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}
