'use server';

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await mongoose.connect(process.env.MONGO_URL as string);
    await JobModel.deleteOne({
        _id: id
    })
    console.log("Deleted");
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}