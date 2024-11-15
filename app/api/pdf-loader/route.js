import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

//const pdfUrl="https://rightful-fox-726.convex.cloud/api/storage/82cdd451-4e46-40af-9148-bf58744d9072"
export async function GET(req){
    const reqUrl=req.url;
    const {seacrhParams} = new URL(reqUrl);
    const pdfUrl=seacrhParams.get('pdfUrl');
    console.log(pdfUrl);

    const response=await fetch(pdfUrl);
    const data=await response.blob();
    const loader=new WebPDFLoader(data);
    const docs=await loader.load();

    let pdfTextContent='';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent;
    })

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList=[];
    output.forEach(doc=>{
        splitterList.push(doc.pageContent);
    })

    return NextResponse.json({result:splitterList})
}