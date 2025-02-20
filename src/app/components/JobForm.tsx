'use client';

import '@radix-ui/themes';
import { Button, TextField } from "@radix-ui/themes";
import { Box } from "@radix-ui/themes";
import {TextArea} from '@radix-ui/themes';
import { Flex } from "@radix-ui/themes";
import { Theme } from "@radix-ui/themes";
import { Radio } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faEnvelope, faPhone, faUser, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import type { Job } from '@/models/Job';


import {
    CitySelect,
    CountrySelect,
    StateSelect,
  } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";
import ImageUpload from './ImageUpload';
import saveJobAction from '../actions/jobActions';
import { redirect } from 'next/navigation';

export default function JobForm({orgId,jobDoc}:{orgId:string;jobDoc?:Job}) {
    const [countryId, setCountryId] = useState(jobDoc?.countryid || 0);
    const [stateId, setStateId] = useState(jobDoc?.stateid || 0);
    const [cityId, setCityId] = useState(jobDoc?.cityid || 0);
    const [countryName, setCountryName] = useState(jobDoc?.country || 0);
    const [stateName, setStateName] = useState(jobDoc?.state || 0);
    const [cityName, setCityName] = useState(jobDoc?.city || 0);

    async function handleSaveJob(data:FormData) {
        data.set('country',countryName.toString());
        data.set('state',stateName.toString());
        data.set('city',cityName.toString());
        data.set('countryid',countryId.toString());
        data.set('stateid',stateId.toString());
        data.set('cityid',cityId.toString());
        data.set('orgId',orgId);
        const jobDoc = await saveJobAction(data);
        redirect(`/jobs/${jobDoc.orgId}`);
    }

    return (
        <Theme>
            <form 
                action={handleSaveJob}
                className="container flex flex-col ml-6 gap-4 ">
                    {jobDoc && (
                        <input type="hidden" name="id" value={jobDoc?._id}/>
                        )}

                    <TextField.Root name="title" placeholder="Job Title" className="px-4 py-2 border rounded-md focus:outline-none focus:ring-0 cursor-text transition duration-200" defaultValue={jobDoc?.title || ''}/>
                        
                        <div className="grid grid-cols-3 *:mr-4">
                            <Flex align="start" direction="row" gap="1">
                                <div className="flex flex-col">
                                    <span className="" >Remote?</span> 
                                    <Flex asChild gap="2">
                                        <Text as="label" size="2">
                                            <Radio name="remote" value="On-site" defaultChecked className="mr-1 items-baseline"/>
                                            <span className="text-sm">On-Site</span>
                                        </Text>
                                    </Flex>

                                    <Flex asChild gap="2">
                                        <Text as="label" size="2">
                                            <Radio name="remote" value="Hybrid-remote" className="mr-1 items-center"/>
                                            <span className="text-sm items-center">Hybrid-remote</span>
                                        </Text>
                                    </Flex>

                                    <Flex asChild gap="2">
                                        <Text as="label" size="2">
                                            <Radio name="remote" value="Fully remote" className="mr-1 items-center"/>
                                            <span className="text-sm">Fully remote</span>
                                        </Text>
                                    </Flex>
                                </div>
                            </Flex>
                            <Flex align="start" direction="row" gap="1">
                                <div className="flex flex-col">
                                    <span className="">Full-Time?</span> 
                                    <Flex asChild gap="2">
                                        <Text as="label" size="2">
                                                <Radio name="type" value="Project" defaultChecked className="mr-1 items-baseline"/>
                                            <span className="text-sm">Project</span>
                                        </Text>
                                    </Flex>

                                    <Flex asChild gap="2">
                                        <Text as="label" size="2">
                                                <Radio name="type" value="Part-Time" className="mr-1 items-center"/>
                                            <span className="text-sm items-center">Part-Time</span>
                                        </Text>
                                    </Flex>

                                    <Flex asChild gap="2">
                                        <Text as="label" size="2">
                                                <Radio name="type" value="Full-Time" className="mr-1 items-center"/>
                                            <span className="text-sm">Full-Time</span>
                                        </Text>
                                    </Flex>
                                </div>
                            </Flex>
                            <div>
                                Salary
                                <div className='flex flex-row'>
                                    <Box maxWidth="1px" className='flex flex-row items-center border border-gray-300 rounded-md *:p-1'>
                                        <FontAwesomeIcon icon={faDollar} className='ml-1 ' />
		                                <TextField.Root name="salary" size="1" placeholder="" defaultValue={jobDoc?.salary || ''}/>
                                        <span className='text-sm text-gray-500'>K/year</span>
	                                </Box>
                                </div>
                            </div>
                        </div>
                        <div>
                        <h6>Location</h6>
                        <div className="flex flex-row gap-2">
                                    <CountrySelect
                                        defaultValue={countryId? {id:countryId,name:countryName} : 0}
                                        onChange={(e: any) => {
                                        setCountryId(e.id);
                                        setCountryName(e.name);
                                        }}
                                        placeHolder="Select Country"
                                    />
                                    <StateSelect
                                        countryid={countryId}
                                        defaultValue={stateId? {id:stateId,name:stateName} : 0}
                                        onChange={(e:any) => {
                                        setStateId(e.id);
                                        setStateName(e.name);
                                        }}
                                        placeHolder="Select State"
                                    />
                                    <CitySelect
                                        countryid={countryId}
                                        stateid={stateId}
                                        defaultValue={cityId? {id:cityId,name:cityName} : 0}
                                        onChange={(e:any) => {
                                            setCityId(e.id);
                                            setCityName(e.name);
                                        }}
                                        placeHolder="Select City"
                                    />
                                </div>
                        </div>
                        <div className="grid grid-cols-3 *:mr-4">
                            <div className='flex flex-col mt-2 mb-2'>
                                <h3>Job icon</h3>
                                <ImageUpload name="jobIcon" icon={faUser} defaultValue={jobDoc?.jobIcon} />
                            </div>
                            <div className='flex flex-row'>
                                <div className='flex flex-col mt-2 mb-2'>
                                    <h3>Contact</h3>
                                    <ImageUpload name="contactPhoto" icon={faStar} defaultValue={jobDoc?.contactPhoto}/>
                                </div>
                                <div className='mt-8 ml-2 *:ml-1 *:mt-1 *:text-sm'>
                                    <Box maxWidth="1px" className='flex flex-row items-center border border-gray-300 rounded-md *:p-1'>
                                        <FontAwesomeIcon icon={faUser} className='ml-1 ' />
		                                <TextField.Root size="1" placeholder="Name" name="contactName" defaultValue={jobDoc?.contactName || ''}/>
	                                </Box>
                                    <Box maxWidth="1px" className='flex flex-row items-center border border-gray-300 rounded-md *:p-1'>
                                        <FontAwesomeIcon icon={faPhone} className='ml-1' />
		                                <TextField.Root size="1" placeholder="Phone" name="contactPhone" defaultValue={jobDoc?.contactPhone || ''}/>
	                                </Box>
                                    <Box maxWidth="1px" className='flex flex-row items-center border border-gray-300 rounded-md *:p-1'>
                                        <FontAwesomeIcon icon={faEnvelope} className='ml-1' />
		                                <TextField.Root size="1" placeholder="Email" name="contactEmail" defaultValue={jobDoc?.contactEmail || ''}/>
	                                </Box>
                                </div>
                            </div>
                        </div>
                    <TextArea size="30" name="description" placeholder="Job Description" className="border rounded-md border-gray-300 px-1" defaultValue={jobDoc?.description || ''}/>
                    <div className='flex justify-center mt-3'>
                        <button className='bg-blue-600 text-white h-9 items-center rounded-md'>
                            <span className='px-8'>Save</span>
                        </button>
                    </div>
            </form>
        </Theme>
    );
}