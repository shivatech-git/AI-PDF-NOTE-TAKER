'use client'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

function Dashboard() {
  const {user} = useUser();

  const fileList=useQuery(api.pdfStorage.GetUserFiles,{
    userEmail:user?.primaryEmailAddress?.emailAddress
  });

  console.log(fileList);
  return (
    <div> 
      <h2 className='font-medium text-3xl'>Workspace</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10'>
        {fileList&& fileList.length > 0 && fileList.map((filter,index)=>(
          <Link href={'/workspace/'+filter.fileId}key={filter.fileId}>
          <div key={index} className='flex p-5 shadow-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all'>
            <Image src={'/pdf.png'} alt='file' width={50} height={70}/>
            <h2 className='mt-3 font-medium text-lg'>{fileList?.fileName}</h2>
          </div>
          </Link>
        ))
      }
      </div>
    </div>
  )
}

export default Dashboard