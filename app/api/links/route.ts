// import { NextRequest, NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import UserModel from '@/models/User'; // Rename the model import to avoid conflict
// import connectMongo from "@/libs/mongoose";

// export async function POST(req: NextRequest, res: NextResponse) {
//   try {
//     await connectMongo();
//     const body = await req.json();
//     const { userId, linkIndex, platform, action, updatedLink, incrementClicks, archive, socialLinks, image, name, bio, handle, themePalette, buttonStyle, ...otherFields } = body;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
//     }
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
//     const updatedLinks = [...user.links];
//     switch (action) {
//       case 'add':
//         updatedLinks.push({
//           ...updatedLink,
//           clicks: 0,
//           archive: false,
//         });
//         break;
//       case 'edit':
//         if (linkIndex !== undefined) {
//           updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], ...updatedLink };
//         }
//         break;
//       case 'delete':
//         if (linkIndex !== undefined) {
//           updatedLinks.splice(linkIndex, 1);
//         }
//         break;
//       case 'update':
//         if (linkIndex !== undefined) {
//           if (incrementClicks) {
//             updatedLinks[linkIndex].clicks += 1;
//           }
//           if (typeof archive === 'boolean') {
//             updatedLinks[linkIndex].archive = archive;
//           }
//         }
//         break;
//       case 'updateSocialLinkClicks':
//         const socialLinksObject = Object.fromEntries(user.socialLinks);
//         if (platform && incrementClicks) {
//           if (socialLinksObject[platform]) {
//             socialLinksObject[platform].clicks += 1;
//           } else {
//             console.log(`Platform ${platform} does not exist in socialLinks`);
//           }
//         }
//         break;
//       default:
//         if (image) user.image = image;
//         if (name) user.name = name;
//         if (bio) user.bio = bio;
//         if (handle) user.handle = handle;
//         if (themePalette) user.themePalette = themePalette;
//         if (buttonStyle) user.buttonStyle = buttonStyle;
//     }
//     user.links = updatedLinks;
//     // Update other fields if provided
//     for (const [key, value] of Object.entries(otherFields)) {
//       user[key] = value;
//     }
//     // Update socialLinks if provided
//     if (socialLinks) {
//       user.socialLinks = socialLinks;
//     }
//     await user.save();
//     return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function GET(req: NextRequest, res: NextResponse) {
//   const { searchParams } = new URL(req.url);
//   const handle = searchParams.get('handle');
//   try {
//     await connectMongo();
//     const existingUser = await UserModel.findOne({ handle });
//     if (existingUser) {      
//       return NextResponse.json({
//         message: 'User data retrieved successfully',
//         user: existingUser
//       }, { status: 200 });
//     } else {
//       return NextResponse.json({
//         message: 'User not found'
//       }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error getting user data:', error);
//     return NextResponse.json(
//       { message: "An error occurred", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import UserModel from '@/models/User'; // Rename the model import to avoid conflict
import connectMongo from "@/libs/mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { userId, linkIndex, platform, action, updatedLink, incrementClicks, archive, socialLinks, image, name, bio, handle, themePalette, buttonStyle, ...otherFields } = body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const updatedLinks = [...user.links];
    switch (action) {
      case 'add':
        updatedLinks.push({
          ...updatedLink,
          clicks: 0,
          archive: false,
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
      case 'updateSocialLinkClicks': {
        const socialLinksObject = Object.fromEntries(user.socialLinks);
        if (platform && incrementClicks) {
          if (socialLinksObject[platform]) {
            socialLinksObject[platform].clicks += 1;
          } else {
            console.log(`Platform ${platform} does not exist in socialLinks`);
          }
        }
        break;
      }
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
    for (const [key, value] of Object.entries(otherFields)) {
      user[key] = value;
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');
  try {
    await connectMongo();
    const existingUser = await UserModel.findOne({ handle });
    if (existingUser) {      
      return NextResponse.json({
        message: 'User data retrieved successfully',
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
