import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
    params: {
        jobId: string
    }
}

export default async function EditJobPage(PageProps: PageProps) {
    const jobId = PageProps.params.jobId;
    await mongoose.connect(process.env.MONGO_URL as string)
    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));

    const workos = new WorkOS(process.env.WORKOS_API_KEY)

    const {user} = await withAuth();

    if(!user) return "Pls log in";

    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: jobDoc.orgId
    });
    if(oms.data.length === 0)
    {
        return 'Access denied';
    }

    return (
        <div>
            <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc}/>
        </div>
    )
}