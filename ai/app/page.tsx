// app/page.tsx

'use client'

import { useChat } from 'ai/react';
import DropdownMenu from '@/components/Dropdown';

export default function Chat() {
   const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  })

  return (
    <div className='h-[100vh] w-full bg-green-950'>
     <div className='h-[80px] bg-white'>
      <div>
        <DropdownMenu />
      </div>
     </div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : ' 🤖: '}
            {m.content}
          </li>
        ))}
      </ul>
    
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
