
// import connectMongo from "@/libs/mongoose";
// import User from "@/models/User";
// import { NextResponse, NextRequest } from "next/server";

// export async function POST(req: NextRequest, res: NextResponse) {
//     const body = await req.json();
//     const { email, handle } = body;

//     try {
//         await connectMongo();

//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             if (handle) {
//                 existingUser.handle = handle;
//                 await existingUser.save();

//                 return NextResponse.json({
//                     message: 'User data saved successfully',
//                     user: existingUser
//                 }, { status: 200 });
//             }

//             return NextResponse.json({
//                 message: 'User data get successfully',
//                 user: existingUser
//             }, { status: 200 });
//         } else {
//             return NextResponse.json({
//                 message: 'User not found'
//             }, { status: 404 });
//         }
//     } catch (error) {
//         console.error('Error saving user data:', error);
//         return NextResponse.json(
//             { message: "An error occurred", error: error.message },
//             { status: 500 }
//         );
//     }
// }


// export async function DELETE(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get('id');

//     try {
//         await connectMongo();

//         if (!userId) {
//             return NextResponse.json({
//                 message: 'User ID is required'
//             }, { status: 400 });
//         }

//         // Find the user document
//         const user = await User.findById(userId).lean();

//         if (!user) {
//             return NextResponse.json({
//                 message: 'User not found'
//             }, { status: 404 });
//         }

//         // Determine fields to unset, excluding 'email', '_id', and 'handle'
//         // const fieldsToRemove = Object.keys(user).reduce((fields, key) => {
//         //     if (key !== 'email' && key !== '_id' && key !== 'handle' && key !== 'updatedAt' && key !== 'createdAt') {
//         //         fields[key] = '';
//         //     }
//         //     return fields;
//         // }, {});


//          // Determine fields to unset, excluding 'email', '_id', and 'handle'
//          const fieldsToRemove: Record<string, string> = Object.keys(user).reduce((fields, key) => {
//             if (key !== 'email' && key !== '_id' && key !== 'handle' && key !== 'updatedAt' && key !== 'createdAt') {
//                 fields[key] = '';
//             }
//             return fields;
//         }, {} as Record<string, string>);

//         // Use the $unset operator to remove specified fields, then set handle to an empty string
//         const result = await User.updateOne(
//             { _id: userId },
//             { 
//                 $unset: fieldsToRemove,
//                 $set: { handle: '' } // Set handle to an empty string or unique placeholder
//             }
//         );

//         if (result.modifiedCount > 0) {
//             return NextResponse.json({
//                 message: 'Fields deleted successfully, except email, _id, and handle'
//             }, { status: 200 });
//         } else {
//             return NextResponse.json({
//                 message: 'No fields to delete'
//             }, { status: 404 });
//         }
//     } catch (error) {
//         console.error('Error deleting fields:', error);
//         return NextResponse.json(
//             { message: "An error occurred", error: error.message },
//             { status: 500 }
//         );
//     }
// }


import { NextRequest, NextResponse } from 'next/server';
import mongoose, { Document } from 'mongoose';
import UserModel from '@/models/User'; // Rename the model import
import connectMongo from "@/libs/mongoose";

interface User extends Document {
  name?: string;
  handle?: string;
  bio?: string;
  image?: string;
  email?: string;
  emailVerified?: Date;
  totalViews?: number;
  linksLocation?: string;
  themePalette?: {
    name: string;
    palette: string[];
  };
  buttonStyle?: string;
  links: { title: string; url: string; clicks: number; archive: boolean }[];
  socialLinks: { title: string; url: string }[];
  updatedAt: Date;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectMongo();
    const body = await req.json();
    const { userId, linkIndex, action, updatedLink, incrementClicks, archive, socialLinks, image, name, bio, handle, themePalette, buttonStyle, ...otherFields } = body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const user = await UserModel.findById(userId) as User; // Cast to User
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedLinks = [...user.links];

    switch (action) {
      case 'add':
        updatedLinks.push({
          ...updatedLink,
          clicks: 0,
          archive: false
        });
        break;
      case 'edit':
        if (linkIndex !== undefined) {
          updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], ...updatedLink };
        }
        break;
      case 'delete':
        if (linkIndex !== undefined) {
          updatedLinks.splice(linkIndex, 1);
        }
        break;
      case 'update':
        if (linkIndex !== undefined) {
          if (incrementClicks) {
            updatedLinks[linkIndex].clicks += 1;
          }
          if (typeof archive === 'boolean') {
            updatedLinks[linkIndex].archive = archive;
          }
        }
        break;
      default:
        if (image) user.image = image;
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (handle) user.handle = handle;
        if (themePalette) user.themePalette = themePalette;
        if (buttonStyle) user.buttonStyle = buttonStyle;
    }

    user.links = updatedLinks;

    // Update other fields if provided
    // for (const [key, value] of Object.entries(otherFields)) {
    //   user[key] = value;
    // }

    for (const [key, value] of Object.entries(otherFields)) {
        (user as any)[key] = value;
      }

    // Update socialLinks if provided
    if (socialLinks) {
      user.socialLinks = socialLinks;
    }

    await user.save();

    return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');

  try {
    await connectMongo();
    const existingUser = await UserModel.findOne({ handle }) as User; // Cast to User
    if (existingUser) {
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
    console.error('Error getting user data:', error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
