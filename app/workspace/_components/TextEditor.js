import React, { useEffect } from 'react'
import { useEditor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useQuery } from 'convex/react'
import { api } from "/convex/_generated/api";
import { GetNotes } from '@/convex/notes'

function TextEditor() {

    const notes=useQuery(api.notes.GetNotes,{
            fileId:fileId
    })

    console.log( notes)
    const editor = useEditor({

        extensions: [StarterKit,
            Placeholder.configure({
                placeholder:'Start Taking your notes here...'
            })
        ],
        content: '<p>Hello World! 🌎️</p>',
        editorProps:{
            attributes:{
                class:'focus:outline-none h-screen p-5'
            }
        }
      })

      useEffect(()=>{
        editor&&editor.commands.setContent(notes)
      },[notes&&editor])
  return (
    <div>
        <div>
        <EditorContent editor={editor} />
        <div className='overflow-scroll h-[88vh'>
            <EditorContent editor={editor}/>
        </div>
        </div>
    </div>
  )
}

export default TextEditor