// app/page.tsx

'use client'

import { useChat } from 'ai/react';
import DropdownMenu from '@/components/Dropdown';

export default function Chat() {
   const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  })

  return (
    <div className='h-[100vh] w-full bg-[#1e0c31]'>
     <div className='h-[80px] bg-white border-b-[1px] border-[#00000010]'>
      <div>
        <DropdownMenu />
      </div>
     </div>

     <div className='w-full mt-[0.03rem] overflow-hidden  flex justify-center h-[88%] '>
     <div className='bg-white w-[60%] pb-[10%] overflow-y-auto text-black h-full'>
     <ul className='space-y-1'>
       {messages.map((m, index) => (
         <li key={index} className={`mb-1 p-3 py-5 ${m.role === 'user' ? 'bg-[#00000030] px-[11%]' : 'mx-[10%]'}`}>
           {m.role === 'user' ? 'You: ' : ' 🤖: '}
           {m.content}
        </li>
       ))}
      </ul>

     </div>
     </div>
     
    
      <form onSubmit={handleSubmit} className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-full max-w-md">
  <input
    className="p-4 text-black mb-8 border border-gray-300 rounded-xl shadow-xl w-full"
    value={input}
    placeholder="Say something..."
    onChange={handleInputChange}
  />
</form>


    </div>
  )
}
