import connectMongo from "@/libs/mongoose";
import Payment from "@/models/superProfile/Payment";
import DigitalPaymentProduct from "@/models/superProfile/DigitalPaymentProduct";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        await connectMongo();

        // Validate input data
        const { audienceData, paymentDetails } = body;
        if (!audienceData || !paymentDetails) {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }

        // Find or create audience
        let audience = await User.findOneAndUpdate(
            { email: audienceData.email },
            audienceData,
            { new: true, upsert: true }
        );

        if (!audience) {
            return NextResponse.json({ message: "Failed to create or update user" }, { status: 500 });
        }

        // Ensure payment details are numbers
        const amount = parseFloat(paymentDetails.amount);
        const currency = paymentDetails.currency;
        const razorpayPaymentId = paymentDetails.razorpayPaymentId;
        const razorpayOrderId = paymentDetails.razorpayOrderId;
        const razorpaySignature = paymentDetails.razorpaySignature;
        const product = paymentDetails.product;

        if (isNaN(amount)) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        // Create payment
        const payment = new Payment({
            amount,
            currency,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            audience: audience._id,
            digitalProduct: product,
        });

        await payment.save();

        // Update product sales and revenue
        if (product) {
            let productDoc = await DigitalPaymentProduct.findOne({ _id: product });
            if (productDoc) {
                const sale = parseFloat(productDoc.sale) || 0;
                const revenue = parseFloat(productDoc.revenue) || 0;

                await DigitalPaymentProduct.findOneAndUpdate(
                    { _id: product },
                    { sale: sale + 1, revenue: revenue + amount },
                    { new: true }
                );
            }
        }

        return NextResponse.json({ message: "Payment success" }, { status: 200 });

    } catch (error) {
        console.error('Error processing payment:', error);
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}




