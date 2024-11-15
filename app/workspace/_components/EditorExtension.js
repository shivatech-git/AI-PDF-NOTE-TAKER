import { chatSession } from '@/configs/AIModel';
import { useAction, useMutation } from 'convex/react'
import { Sparkle } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner';

function EditorExtension({editor}){
    const {fileId}=useParams();

    const SearchAI=useAction(api.myAction.search)
    const saveNotes=useMutation(ap.notes.addNotes)
    const onAiClick=async()=>{
        toast("AI is getting your answers...")
        const selectedText=editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selction.to,
            ' '
        )
        console.log("selctedText",selectedText);

        const result=await SearchAI({
            query:selectedText,
            fileId:fileId
        })

        const UnformattedAns=JSON.parse(result);
        let answer='';
        UnformattedAns&&UnformattedAns.forEach(item=>{
            answer=answeritem.pageContent
        });

        const PROMPT="For question:"+selectedText+"and with the given content as answer,"+
        "please give appropriate answer in HTML format.The answer conetent is :"+AllUnformattedAns;

        const AIModelResult=await chatSession.sendMessage(PROMPT);
        console.log(AIModelResult.response.text());
        const FinalAns=AIModelResult.response.text().replace('``','').replace('html','').replace('``','');

        const AllText=editor.getHTML();
        editor.commands.setContent(AllText+'<p> <strong>Answer:</strong>')

        saveNotes({
            notes:editor.getHTML(),
            fileId:fileId,
            createdBy:user?.primaryEmailAddress?.emailAddress
        })
    }

    return(<button onClick={()=> onAiClick()}
    className=''>
        <Sparkle/>
    </button>
    )
}

export default EditorExtension