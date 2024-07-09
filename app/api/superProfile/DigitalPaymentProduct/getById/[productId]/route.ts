// D:\NextJs\ship-fast-ts-main\app\api\superProfile\DigitalPaymentProduct\getById/[productId].ts

import connectMongo from "@/libs/mongoose";
import DigitalPaymentProduct from "@/models/superProfile/DigitalPaymentProduct";
import { NextResponse, NextRequest } from "next/server";

// Handler for GET requests to fetch product by _id
export async function GET(req: NextRequest, res: NextResponse) {

    await connectMongo();

    const productId = req.url.split('/').pop();

    if (productId) {
        const product = await DigitalPaymentProduct.findById(productId);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Product retrieved successfully", product }, { status: 200 });

    }
}

// Handler for Delete requests
export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        await connectMongo();

        const productId = req.url.split('/').pop(); // Extract productId from the URL

        if (!productId) {
            return NextResponse.json({ message: "Product ID not provided" }, { status: 400 });
        }

        // Find the product by ID and delete it
        const deletedProduct = await DigitalPaymentProduct.findByIdAndDelete(productId);

        if (deletedProduct) {
            return NextResponse.json({ message: "Product deleted successfully", product: deletedProduct }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest, res: NextResponse) {
    try {
        await connectMongo();

        const productId = req.url.split('/').pop(); // Extract productId from the URL
        const { field, value } = await req.json(); // Get the field and value from the request body

        if (!productId) {
            return NextResponse.json({ message: "Product ID not provided" }, { status: 400 });
        }

        // Update the specified field
        const update: { [key: string]: boolean } = { [field]: value };
        // const update = { [field]: value };

        // If isPublish is being set to false, also set paymentEnable to false
        if (field === 'isPublish' && value === false) {
            update.paymentEnable = false;
        }
        if (field === 'isPublish' && value === true) {
            update.paymentEnable = true;
        }

        const updatedProduct = await DigitalPaymentProduct.findByIdAndUpdate(productId, update, { new: true });

        if (updatedProduct) {
            return NextResponse.json({ message: "Product updated successfully", product: updatedProduct }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

    } catch (error) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}