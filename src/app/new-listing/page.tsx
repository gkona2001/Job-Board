'use server';
import {withAuth} from "@workos-inc/authkit-nextjs";
import { WorkOS } from '@workos-inc/node';
import createCompany from "../actions/workosactions";
import Link from "next/link";

export default async function NewListing() {

    const {user} = await withAuth();

    if(!user){
        return (
            <div className="ml-4">
                Please log in
            </div>
        );
    }
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
    })

    const activeOrganizationMemberships = await organizationMemberships.data.filter( om => om.status === 'active');
    const organizationNames:{[key:string]: string} = {};
    for(const activeMembership of activeOrganizationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationNames[organization.id] = organization.name;
    }

    return(
        <div className="container ml-6">
            <div>
                <h2 className="text-lg mt-4"> Your companies</h2>
                <p className="text-gray-500 text-sm ">Select a company to post a job</p>
                <div className="mt-2">
                    <div className="inline-block *:mb-1">
                        {Object.keys(organizationNames).map(orgId => (
                            <Link key={orgId} href={'/new-listing/'+orgId} className="py-2 px-4 rounded-md block border bg-gray-200">
                                {organizationNames[orgId]}
                            </Link>
                        ))}
                    </div>
                </div>

                {organizationMemberships.data.length === 0 && (
                    <div className="mt-1 ml-6 border border-gray-200 px-2 py-2 rounded-md bg-gray-100">
                        No companies
                    </div>
                )}
                    <Link href={'/new-company'} className="mt-4 items-center inline-block bg-gray-200 px-2 py-2 rounded-md">
                        Create a new company
                    </Link>
            </div>
        </div>
    );
}