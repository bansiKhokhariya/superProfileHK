
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();
    let email = body.email;

    try {
        await connectMongo();

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            // If user does not exist, create a new user
            await User.create({ email });
        }
        return NextResponse.json({
            message: 'User data saved successfully'
        },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error saving user data:', error);
        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}
