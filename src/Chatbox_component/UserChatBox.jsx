import React, { useState, useEffect, useRef } from 'react';
import chatGptIcon from './chatgpt.png';
import emojiIcon from './addemoji.png';
import filesIcon from './attachfile.png';
import sendIcon from './send.png';
import infoIcon from './info.png';
import Messagebullble from './Messagebullble';

const UserChatBox = ({ contact, messagesData, updateMessages }) => {
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);

  const btnClick = () => {
    setColor(!color);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: true };
      updateMessages(contact.username, newMessage);
      setMessage("");
    } else if (file) {
      const newFileMessage = { file: URL.createObjectURL(file), fileName: file.name, sender: true };
      updateMessages(contact.username, newFileMessage);
      setFile(null);
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  return (
    <>
      <div className="top bg-gray-700 h-[10%] w-[100%] rounded-t-md">
        <div className="flex justify-between items-center">
          <div className='flex items-center my-2'>
            <img src={contact.profilepic} className='h-10 w-10 m-2 rounded-full object-cover cursor-pointer' alt='profile' />
            <p className="text-white font-medium">{contact.username}</p>
          </div>
          <img src={infoIcon} className='h-6 w-6 mr-2 cursor-pointer' alt='infoicon'/>
        </div>
      </div>
      
      <div className="middle bg-slate-100 h-[79%] w-[100%] flex flex-col overflow-y-auto p-2 
                      scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 
                      scrollbar-thumb-rounded scrollbar-track-rounded">
        {messagesData[contact.username]?.map((msg, index) => (
          <Messagebullble key={index} message={msg.text} file={msg.file} fileName={msg.fileName} isSender={msg.sender} />
        ))}
        {/* Dummy div to keep the scroll at the bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={`bottom-0 flex items-center h-[11%] w-[100%] rounded-b-md ${color ? 'bg-green-600' : 'bg-gray-700'} duration-300`}>
        <button><img src={chatGptIcon} alt="ai" className='flex-1 h-10 w-10 ml-4 cursor-pointer' onClick={btnClick}/></button>
        <button><img src={emojiIcon} alt="emojis" className='flex-1 h-7 w-7 ml-3 cursor-pointer'/></button>
        <input 
          type="file" 
          id="fileInput" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        <button onClick={() => document.getElementById('fileInput').click()}><img src={filesIcon} alt="files" className='flex-1 h-7 w-7 ml-3 cursor-pointer'/></button>
        <input 
          type="text" 
          placeholder='Enter your message...' 
          className='flex-1 h-12 w-80 pl-3 pr-4 rounded-3xl ml-5 outline-none'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}><img src={sendIcon} alt="send" className='flex-1 h-7 ml-3 mr-3 w-7 cursor-pointer'/></button>
      </div>
    </>
  );
};

export default UserChatBox;
