'use server';
import {withAuth} from "@workos-inc/authkit-nextjs";
import { WorkOS } from '@workos-inc/node';
import createCompany from "../actions/workosactions";

export default async function NewCompanyPage() {

    const {user} = await withAuth();

    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    async function handleNewCompanyFormSubmit(data: FormData) {
        'use server';
        if(user) {
            await createCompany(data.get('newCompanyName') as string, user.id);
        }
    }
    return (
        <div>
            <h2 className="text-lg mt-4 ml-6"> Create a new company</h2>
            <p className="text-gray-500 text-sm  ml-6">To create a Job, you first need to create a company</p>
            <form 
                action={handleNewCompanyFormSubmit}
                className="flex gap-2 ml-6 mt-2">
                <input
                    name='newCompanyName'
                    className="p-2 border border-gray-400 rounded-md"
                    placeholder="company name">

                </input>
                <button type='submit' className="ml-2 items-center bg-gray-200 px-2 rounded-md">
                    Create company
                </button>
            </form>
        </div>
    )
}