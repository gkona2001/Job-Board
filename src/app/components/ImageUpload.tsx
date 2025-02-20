import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@radix-ui/themes"
import { ChangeEvent, useRef, useState } from "react"
import axios from 'axios'
import Image from "next/image"


export default function ImageUpload({name,icon,defaultValue=''}:{name:string,icon:IconDefinition,defaultValue:string}) {
    const fileInRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState(defaultValue);
    const [isUploading,setIsUploading] = useState(false);

    async function upload(ev: ChangeEvent<HTMLInputElement>) {
        const input = ev.target as HTMLInputElement;
        if(input && input.files && input.files.length>0)
        {
            setIsUploading(true);
            const file = input.files[0];
            const data = new FormData;
            data.set('file',file);
            const response = await axios.post('/api/upload',data);
            if(response.data.url)
            {
                setIsUploading(false);
                setUrl(response.data.url);
            }
        }
    }
    return (
        <div>
            <div className='bg-gray-100 size-24 rounded-md items-center justify-center inline-flex'>
                {!isUploading && !url && (
                    <FontAwesomeIcon icon={icon} className="text-gray-500 text-xl" />
                )}
                {isUploading && !url && (
                    <FontAwesomeIcon icon={faSpinner} className="text-gray-500 text-xl animate-spin" />
                )}
                {url && (
                    <Image src={url} alt="a" width={1024} height={1024} className="w-auto h-auto max-w-25 max-h-20"></Image>
                )}
            </div>
            <input type="hidden" name={name} value={url}/>
            <div className="mt-2">
                <input 
                    onChange={ev => upload(ev)}
                    ref={fileInRef} 
                    type="file" 
                    className="hidden"/>
                <Button 
                    type="button"
                    variant='soft' 
                    onClick={() => fileInRef.current?.click()}
                    className='bg-blue-100 text-blue-600 rounded-md text-sm w-24 h-5 flex items-center justify-center mt-1'
                    >
                        Select file
                    </Button>
            </div>
        </div>
    )
}