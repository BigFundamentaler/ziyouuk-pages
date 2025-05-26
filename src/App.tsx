import React, { useState } from 'react';
import ChartList from './components/ChatList'
import SenderInput from './components/SenderInput'
import { chatWithDeepSeek,chatWithGPT } from './api/chat'
import {ChatContext} from './context/ChatConfig'
import './App.css'
let id = 1

const App: React.FC = () => {
  const [isCodeReview,setReviewState] = useState(false)
  const [msgList, setMsgList] = useState<ChatMsg[]>([]);

  const handleSubmitValue = async (value: string) => {
    const messages:CoreMessage[] = [{ role: 'user', content: value }]
    setMsgList(prev => [...prev, { role: 'User', content: value, id: id++ }])
    let answer = ''
    if(isCodeReview) {
      answer = await chatWithGPT(messages)
    } else {
      answer = await chatWithDeepSeek(messages)
    }
    setMsgList(prev => [...prev, { role: 'AI', content: answer, id: id++ }])
  }
  return (
    <ChatContext.Provider value={{isCodeReview,setReviewState}}>
      <div className="app-container">
        <div className="chat-body">
          <ChartList msgList={msgList} />
        </div>
        <div className="chat-input">
          <SenderInput onSubmitClick={handleSubmitValue} />
        </div>
      </div>
    </ChatContext.Provider>

  )
};

export default App;