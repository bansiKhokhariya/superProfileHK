import connectMongo from "@/libs/mongoose";
import DigitalPaymentProduct from "@/models/superProfile/DigitalPaymentProduct";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    try {
        await connectMongo();
        if (body._id) {
            // Update existing document
            const updatedProduct = await DigitalPaymentProduct.findByIdAndUpdate(body._id, body, { new: true });
            if (updatedProduct) {
                return NextResponse.json(
                    { message: "Product updated successfully", product: updatedProduct },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { message: "Product not found" },
                    { status: 400 }
                );
            }
        } else {
            // Add new document
            const newProduct = new DigitalPaymentProduct(body);
            const savedProduct = await newProduct.save();
            return NextResponse.json(
                { message: "Product added successfully", product: savedProduct },
                { status: 201 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}

// Handler for GET requests
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await connectMongo();
        // Fetch all products
        const products = await DigitalPaymentProduct.find();
        return NextResponse.json({ message: "Products retrieved successfully", products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}



