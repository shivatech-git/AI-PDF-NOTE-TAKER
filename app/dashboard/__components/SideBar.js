'use client'
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import { Layout, Shield } from 'lucide-react'
import React from 'react'
import UploadPdf from './UploadPdf'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideBar() {
  const {user} = useUser();
  const path=usePathname();
  const GetUserInfo=useQuery(api.user.GetUserInfo,{
    userEmail:user?.primaryEmailAddress?.emailAddress
  })

  console.log(GetUserInfo)

  const fileList=useQuery(api.pdfStorage.GetUserFiles,{
    userEmail:user?.primaryEmailAddress?.emailAddress
  });
  return (
    <div className='shadow-sm h-screen p-7'>
        <img src={'/logo.svg'} alt='logo' width={170} height={120}/>

        <div className='mt-10'>
            
            <UploadPdf isMaxFile={fileList?.length>=5?true:false}>
            <Button className='w-full'>Upload Pdf</Button>
            </UploadPdf>

            <Link href={'/dashboard'}>
            <div className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer ${path=='/dashboard'&&'bg-slate-200'} `}>
                <Layout/>
                <h2>Workspace</h2>
            </div>
            </Link>
            <Link href={'/dashboard/upgrade'}>
            <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${path=='/dashboard/upgrade'&&'bg-slate-200'}`}>
                <Shield/>
                <h2>Upgrade</h2>
            </div>
            </Link>
            
        </div>
        {!GetUserInfo?.upgrade &&<div className='absolute bottom-24 w-[80%]'>
        <Progress value={(fileList?.length/5)*100&&!GetUserInfo.upgrade} />
        <p className='text-sm mt-1'>{fileList?.length} out of 5 Pdf uploaded</p>
        <p className='text-sm text-gray-400 mt-2'>Upgrade to up</p>
        </div>}
        
    </div>
  )
}

export default SideBar