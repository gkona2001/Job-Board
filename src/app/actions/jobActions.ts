'use server';
import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
async function saveJobAction(data: FormData) {
    await mongoose.connect(process.env.MONGO_URL as string);
    const description = data.get('description');
    const {id, ...jobData} = Object.fromEntries(data)

    const jobDoc = (id)
    ? await JobModel.findByIdAndUpdate(id, jobData)
    : await JobModel.create(jobData);

    if('orgId' in data)
    {
        revalidatePath('/jobs/'+data?.orgId);
    }
    return JSON.parse(JSON.stringify(jobDoc));
}

export default saveJobAction;