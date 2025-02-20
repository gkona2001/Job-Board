import { NextRequest } from "next/server";
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import uniquid from 'uniquid';

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const file = data.get('file') as File;

    const s3client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string
        },
    });

    const fileName = uniquid()+'-'+file.name; //adding uniqueid before name 

    const chunks: Uint8Array[] = [];
    for await (const chunk of file.stream() as AsyncIterable<Uint8Array>){
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const bucketName = 'gagan-job-board';
    await s3client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ACL: 'public-read',
        Body: buffer,
        ContentType: file.type,
    }))

    return Response.json({
        Name: fileName,
        url: `http://${bucketName}.s3.amazonaws.com/${fileName}`
    })

}