"use client"
import {useParams} from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import { useQueries } from 'convex/react';
import {api} from '@/convex/_generated/api';
import TextEditor from '../_components/TextEditor';
import PdfViewer from '../_components/PdfViewer'
import { useQuery } from 'convex/react'

function Workspace(){
    const {fileId}=useParams();
    const fileInfo=useQuery(api.pdfStorage.GetFileRecord,{
        fileId:fileId
    })

    useEffect(()=>{
        console.log(fileInfo)
    },[fileInfo])

    return(
        <div>
            <WorkspaceHeader fileName={fileInfo?.fileName}/>
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    {/*Text editor*/}
                    <TextEditor/>

                </div>
                <div>
                    {/*Pdf viewer*/}
                    <PdfViewer fileUrl={fileInfo?.fileUrl}/>

                </div>
            </div>
        </div>
    )
}

export default Workspace