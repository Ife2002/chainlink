'use client';
 
import { useCompletion } from 'ai/react';
 
export default function Chat() {
  const { completion, input, handleInputChange, handleSubmit, error } =
    useCompletion();
 
  return (
    <div className='w-full h-[100vh] bg-[#6d6c6c]'>
    <div className="flex flex-col p-3 bg-slate-500 w-full max-w-md py- mx-auto stretch">
      <h4 className="text-xl text-center font-bold text-gray-900 md:text-xl pb-4">
        Use Completion Example
      </h4>
      {error && (
        <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
          {error.message}
        </div>
      )}
      {completion}
      <div className='grid grid-cols-2 gap-2 justify-center'>
        <div className='bg-black mx-auto py-3 rounded-xl px-5 text-center'>Tx Explainer</div>
        <div className='bg-black mx-auto py-3 rounded-xl px-5 text-center'> Domain checker</div>
        <div className='bg-black mx-auto py-3 rounded-xl px-5 text-center'> DCA bot</div>
        <div className='bg-black mx-auto py-3 rounded-xl px-5 text-center'> Swap tokens</div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 text-black mb-8 border border-gray-300 rounded-xl shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
    </div>
  );
}