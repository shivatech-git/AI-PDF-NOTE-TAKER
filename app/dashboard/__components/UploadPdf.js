'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

//import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAction, useMutation } from 'convex/react'
import { api } from "/convex/_generated/api";
import { Axis3DIcon, Loader2Icon } from 'lucide-react'
import uuid4 from "uuid4";
import { useUser } from '@clerk/nextjs';
import axios from 'axios'

function UploadPdf({children,isMaxFile}) {

    const generateUploadUrl=useMutation(api.pdfStorage.generateUploadUrl);
    const AddFileEntryToDb=useMutation(api.pdfStorage.AddFileEntryToDb);
    const getFileUrl=useMutation(api.pdfStorage.getFileUrl);
    const embeddDocument=useAction(api.myAction.ingest)
    const {user}=useUser();
    const [file,setFile]=useState();
    const [loading,setLoading]=useState(false);
    const [fileName,setFileName]=useState();
    const [open,setOpen]=useState(false);
    const OnFileSelect=(event)=>{
        setFile(event.target.files[0]);

    }

    const OnUpload=async()=>{
        setLoading(true);
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
        const { storageId } = await result.json();
        console.log('Storage Id',storageId);
        const fileId=uuid4();
        const fileUrl=await getFileUrl({storageId:storageId})

        const response=await AddFileEntryToDb({
            fileId:fileId,
            storageId:storageId,
            fileName:fileName??'Untitled',
            fileUrl:fileUrl,
            createdBy:user?.primaryEmailAddress?.emailAddress
        })
        console.log(response);

        //API call to fetch to process data
        const ApiResp=await axios.get('/api/pdf-loader?pdfUrl='+fileUrl);
        console.log(ApiResp.data.result);
        const embeddedResult=embeddDocument({
          splitText:ApiResp.data.result,
          fileId:fileId
        });
        console.log(embeddedResult);

        setLoading(false);
        setOpen(false);

    }
  return (
    <Dialog open={open}>
  <DialogTrigger asChild>
    <Button onClick={()=>setOpen(true)} disabled={isMaxFile} className="w-full">+ Upload PDF File</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload Pdf File</DialogTitle>
      <DialogDescription asChild>
        <div>
            <div className="flex mt-10 gap-2 p-3 rounded-md border">
                <h2>Select a file to upload</h2>
                <input type="file" accept='application/pdf'
                
                onChange={(event)=>OnFileSelect(event)}/>
            </div>
            <div className='mt-2'>
                <label>File Name</label>
                <Input placeholder="File Name" onChange={(e)=>setFileName(e.target.value)} />
            </div>
            
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled={loading}>
            {loading? <Loader2Icon className='animate-spin'/>:'Upload'}Upload</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default UploadPdf