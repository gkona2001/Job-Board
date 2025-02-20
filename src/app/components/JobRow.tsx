'use client'

import { Job, JobModel } from "@/models/Job";
import { TimeAgo } from "@/app/components/TimeAgo";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import axios from "axios";
 
export default function JobRow({jobDoc}:{jobDoc:Job}) {
  console.log(JSON.stringify(jobDoc));

    return (
        <div className="bg-white grow p-4 rounded-lg shadow-sm flex gap-4 w-auto">
          <div className="content-center">
            <img
              className="size-12"
              src={jobDoc.jobIcon}
            />
          </div>
          <div className="grow">
            <Link href='/' className="text-gray-500 text-sm">{jobDoc.orgName}</Link>
            <div>
            <Link href={'/show/'+jobDoc._id} className="font-bold text-lg mb-1">{jobDoc.title}</Link>
            </div>
            <div className="text-gray-500 text-xs">
              {jobDoc.type} &middot; {jobDoc.city}, {jobDoc.country} &middot; {jobDoc.remote}
              {jobDoc.isAdmin && (
                <>
                  {' '}&middot;{' '}
                  <Link href={`/jobs/edit/`+jobDoc._id}>Edit</Link>
                  {' '}&middot;{' '}
                  <button
                    type="button"
                    onClick={async() => {
                      console.log("Clicked");
                      await axios.delete('/api/jobs?id='+jobDoc._id);
                      window.location.reload()
                    }}
                    >
                      Delete
                  </button>
                </>
              )}
            </div>
          </div>
          {jobDoc.createdAt && (
            <div className="content-end text-gray-500 text-xs">
              <TimeAgo createdAt={jobDoc.createdAt}/>
            </div>
          )}

        </div>
      );
      
    
}