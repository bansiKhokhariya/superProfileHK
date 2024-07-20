
// import connectMongo from "@/libs/mongoose";
// import Payment from "@/models/superProfile/Payment";
// import User from "@/models/User";
// import { NextResponse, NextRequest } from "next/server";

// // Handler for GET requests to fetch product by _id
// export async function GET(req: NextRequest, res: NextResponse) {

//     await connectMongo();

//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get('email');
//     const productId = searchParams.get('productId');

//     if (!email) {
//         return NextResponse.json({ message: "Email is required!" }, { status: 404 });
//     }

//     try {
        
//         const user = await User.findOne({ email });

//         if (!user) {
//             return NextResponse.json({ message: "User not found" }, { status: 404 });
//         }

//         const payment = await Payment.findOne({ audience: user._id, digitalProduct: productId })
//             .populate('digitalProduct')
//             .sort({ createdAt: -1 });

//         return NextResponse.json({ message: "payments get successfully", payment }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching payment data:', error);
//         return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
//     }
// }


import connectMongo from "@/libs/mongoose";
import Payment from "@/models/superProfile/Payment";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

// Handler for GET requests to fetch product by _id
export async function GET(req: NextRequest, res: NextResponse) {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const productId = searchParams.get('productId');

    if (!productId) {
        return NextResponse.json({ message: "Product ID is required!" }, { status: 400 });
    }

    try {
        if (email) {
            // Case when email is provided
            const user = await User.findOne({ email });

            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            const payment = await Payment.findOne({ audience: user._id, digitalProduct: productId })
                .populate('digitalProduct')
                .sort({ createdAt: -1 });

            if (!payment) {
                return NextResponse.json({ message: "Payment not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Payments fetched successfully", payment }, { status: 200 });
        } else {
            // Case when email is not provided
            const productPayments = await Payment.find({ digitalProduct: productId })
                .populate('digitalProduct')
                .sort({ createdAt: -1 });

            return NextResponse.json({ message: "Product payments fetched successfully", payments: productPayments }, { status: 200 });
        }
    } catch (error) {
        console.error('Error fetching payment data:', error);
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}
