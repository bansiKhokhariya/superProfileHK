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
