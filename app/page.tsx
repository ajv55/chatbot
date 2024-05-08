'use client';
import { useChat } from "ai/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Page() {

  const {messages, input, handleInputChange, handleSubmit} = useChat();
  const messagesEndRef = useRef<any>(null);

  const user = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
  const ai = 'https://www.cxtoday.com/wp-content/uploads/2023/10/intriuged-robot-850.jpg';
  const bg = 'https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/what-is-artificial-intelligence-ai.jpg';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if(messagesEndRef.current){
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }

  return (
    <div style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg})`}} className=" w-full flex bg-center bg-cover flex-col justify-evenly items-center mx-auto h-screen stretch">
      <h1 className="text-white font-bold tracking-wide text-7xl mb-4"><span className=" bg-gradient-to-br from-cyan-800 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">AI</span> Chatbot</h1>
      <div ref={messagesEndRef} className="w-[55%] h-[30rem] bg-transparent rounded-xl p-3  shadow-lg shadow-zinc-200 overflow-scroll">
        {messages.map((m) => (
          <div className=" whitespace-pre-wrap" key={m.id}>
            <div className={`${m.role === 'user' ? 'justify-start' : 'justify-end'} flex gap-4 items-center`}> 
              <Image style={{width: '80px', height: '80px'}} src={m.role === 'user' ? user : ai} className=" rounded-full bg-slate-100" alt="image" width={80} height={80}></Image>
              <h1 className=" font-bold text-white text-xl">{m.role === 'user' ? 'User ': 'AI '}</h1>
            </div>
            <p className="text-center text-white mt-8 font-light tracking-wide text-xl">{m.content}</p>
          </div >
          
        ))}
      </div>
      

      <form className="w-full mt-8 flex justify-center items-center " onSubmit={handleSubmit}>
        <div className=" w-[55%] flex justify-start items-start mb-8 bottom-0 ">
          <input className="w-full p-2  border border-zinc-600 rounded-xl shadow-xl" placeholder="Say something..." type="text"  id="message" value={input} onChange={handleInputChange} />
        </div>
      </form>

    </div>
  )
}
