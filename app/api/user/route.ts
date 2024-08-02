
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const { email, handle } = body;

    try {
        await connectMongo();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (handle) {
                existingUser.handle = handle;
                await existingUser.save();

                return NextResponse.json({
                    message: 'User data saved successfully',
                    user: existingUser
                }, { status: 200 });
            }

            return NextResponse.json({
                message: 'User data get successfully',
                user: existingUser
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: 'User not found'
            }, { status: 404 });
        }
    } catch (error) {
        console.error('Error saving user data:', error);
        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    try {
        await connectMongo();

        if (!userId) {
            return NextResponse.json({
                message: 'User ID is required'
            }, { status: 400 });
        }

        // Find the user document
        const user = await User.findById(userId).lean();

        if (!user) {
            return NextResponse.json({
                message: 'User not found'
            }, { status: 404 });
        }

        // Determine fields to unset, excluding 'email', '_id', and 'handle'
        // const fieldsToRemove = Object.keys(user).reduce((fields, key) => {
        //     if (key !== 'email' && key !== '_id' && key !== 'handle' && key !== 'updatedAt' && key !== 'createdAt') {
        //         fields[key] = '';
        //     }
        //     return fields;
        // }, {});

         // Determine fields to unset, excluding 'email', '_id', and 'handle'
         const fieldsToRemove: Record<string, string> = Object.keys(user).reduce((fields, key) => {
            if (key !== 'email' && key !== '_id' && key !== 'handle' && key !== 'updatedAt' && key !== 'createdAt') {
                fields[key] = '';
            }
            return fields;
        }, {} as Record<string, string>);

        // Use the $unset operator to remove specified fields, then set handle to an empty string
        const result = await User.updateOne(
            { _id: userId },
            { 
                $unset: fieldsToRemove,
                $set: { handle: '' } // Set handle to an empty string or unique placeholder
            }
        );

        if (result.modifiedCount > 0) {
            return NextResponse.json({
                message: 'Fields deleted successfully, except email, _id, and handle'
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: 'No fields to delete'
            }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting fields:', error);
        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}