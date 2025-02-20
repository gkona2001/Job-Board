import Image from "next/image";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import mongoose from "mongoose";

import Link from 'next/link';
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
} from '@workos-inc/authkit-nextjs';
import { JobModel, addOrgAndUserData } from "@/models/Job";

export default async function Home() {
  const {user} = await withAuth();
  await mongoose.connect(process.env.MONGO_URL as string);
  let latestJobs = JSON.parse(JSON.stringify(await JobModel.find({},{},{limit:5,sort:'-createdAt'})));
  latestJobs = await addOrgAndUserData(latestJobs,user);
  return (
      <div>
        <Hero />
        <Jobs header='' jobs={latestJobs}/>
      </div>
    );
}
