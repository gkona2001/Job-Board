'use server';
import Jobs from "@/app/components/Jobs";
import { JobModel, addOrgAndUserData } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { AutoPaginatable, Organization, OrganizationMembership, WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
    params: {
        orgId: string;
    }
}

export default async function CompanyJobsPage({ params }: PageProps) {
    const { user } = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(params.orgId);
    let jobDocs = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})));
    jobDocs = await addOrgAndUserData(jobDocs,user);



    return (
        <div className="container ml-6">
            <h3 className="text-xl mb-6">{org.name} Jobs</h3>
            <Jobs header={"Jobs posted by " + org.name} jobs={jobDocs} />
        </div>
    );
}
