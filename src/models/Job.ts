import { AutoPaginatable, OrganizationMembership, User, WorkOS } from "@workos-inc/node";
import mongoose, {Schema} from "mongoose";
import { model, models } from "mongoose";

export type Job ={
    _id: string,
    title: string,
    salary: number,
    remote: string,
    type:  string,
    country: string,
    state:  string,
    city:  string,
    countryid: string,
    stateid: string,
    cityid: string,
    jobIcon:  string,
    contactPhoto:  string,
    contactName: string,
    contactPhone: string,
    contactEmail: string,
    description: string,
    orgId: string,
    orgName?: string,
    createdAt: string,
    updatedAt: string 
    isAdmin?: boolean
}

const JobSchema = new Schema({
    title: {type: String, required:true},
    salary: {type: Number, required:true},
    remote: {type: String, required:true},
    type: {type: String, required:true},
    country: {type: String, required:true},
    state: {type: String, required:true},
    city: {type: String, required:true},
    countryid: {type: String, required: true},
    stateid: {type: String, required: true},
    cityid: {type: String, required: true},
    jobIcon: {type:String},
    contactPhoto: {type:String},
    contactName: {type: String, required:true},
    contactPhone: {type: String, required:true},
    contactEmail: {type: String, required:true},
    description: {type: String, required: true},
    orgId: {type: String, required:true},
    orgName: {type:String}
}, { timestamps: true });


export async function addOrgAndUserData(jobDocs: Job[], user:User|null) {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    await mongoose.connect(process.env.MONGO_URL as string);

    let oms: AutoPaginatable<OrganizationMembership> | null = null;

    if (user) {
        oms = await workos.userManagement.listOrganizationMemberships({
            userId: user.id,
        });
    }

    for (const job of jobDocs) {
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
        if (oms && oms.data.length > 0) {
            job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId);
        }
    }

    return jobDocs;

}

export const JobModel = models?.Job || model('Job', JobSchema);