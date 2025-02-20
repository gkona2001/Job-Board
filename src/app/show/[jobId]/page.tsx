import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import Image from "next/image";

type PageProps = {
    params: {
        jobId: string;
    }
}

export default async function SingleJobPage(props: PageProps) {
    const jobId = props.params.jobId;
    await mongoose.connect(process.env.MONGO_URL as string)
    const jobDoc = await JobModel.findById(jobId);
    return (
        <div className="ml-6">
            <div className="flex flex-row justify-between items-start h-full">
                <div className="flex flex-col justify-end">
                    <h4 className="text-4xl">{jobDoc.title}</h4>
                    <div className="text-blue-800 mt-1">
                        {jobDoc.type} &middot; {jobDoc.city}, {jobDoc.country} &middot; {jobDoc.remote}
                    </div>
                </div>
                <div className="mr-4">
                    <Image 
                        src={jobDoc?.jobIcon} alt={'job icon'} width={500} height={500}
                        className="w-auto h-auto max-w-20 max-h-20"
                        >
                    </Image>
                </div>
            </div>
            <p>{jobDoc.description}</p>
            <div className="bg-gray-200 mt-2 mr-4 rounded-md">
                <div className="flex flex-col *:ml-4">
                    <h1 className="font-bold m-3">Apply by contacting us</h1>
                    <div className="flex flex-row mb-3">
                        <Image 
                            src={jobDoc?.contactPhoto} alt={'job icon'} width={500} height={500}
                            className="w-auto h-auto max-w-20 max-h-20"
                            >
                        </Image>
                        <div className="flex flex-col *:ml-3">
                            <h1>Name: {jobDoc.contactName}</h1>
                            <h1>Email: {jobDoc.contactEmail}</h1>
                            <h1>Phone: {jobDoc.contactPhone}</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}