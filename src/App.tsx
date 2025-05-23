import React, { useState } from 'react';
import ChartList from './components/ChatList'
import SenderInput from './components/SenderInput'
import { chatWithDeepSeek } from './api/chat'
import './App.css'
let id = 1
const App: React.FC = () => {
  const [msgList, setMsgList] = useState<ChatMsg[]>([]);

  const handleSubmitValue = async (value: string) => {
    const messages = [{ role: 'user', content: value }]
    setMsgList(prev => [...prev, { role: 'User', content: value, id: id++ }])
    const answer: string = await chatWithDeepSeek(messages)
    setMsgList(prev => [...prev, { role: 'AI', content: answer, id: id++ }])
  }
  return (
    <div className="app-container">
      <div className="chat-body">
        <ChartList msgList={msgList} />
      </div>
      <div className="chat-input">
        <SenderInput onSubmitClick={handleSubmitValue} />
      </div>
    </div>
  )
};

export default App;