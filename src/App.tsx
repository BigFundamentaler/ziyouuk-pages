import { ApiOutlined, LinkOutlined, SearchOutlined } from '@ant-design/icons';
import { Sender } from '@ant-design/x';
import { Button, Divider, Flex, Switch, theme } from 'antd';
import React, { useState } from 'react';
import { sendChatMessage } from './api/chat';
import './App.css'
const App: React.FC = () => {
  const { token } = theme.useToken();
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  console.log('test')
  const iconStyle = {
    fontSize: 18,
    color: token.colorText,
  };
  const handleSend = async (input: string) => {
    setLoading(true)
    if (!input.trim()) return;

    try {
      // const userMessage = { text: input, sender: 'user' };

      const { data } = await sendChatMessage(input);
      const botMessage = {
        text: data.sendMessage.text,
        sender: 'bot',
        timestamp: data.sendMessage.timestamp
      };
      console.log('botMessage:', botMessage)
      setValue('');
      setLoading(false)
    } catch (error) {
      console.error("发送失败:", error);
    }
  };
  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setValue('');
        console.log('Send message successfully!');
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [loading]);

  return (
    <Sender
      value={value}
      onChange={setValue}
      autoSize={{ minRows: 2, maxRows: 6 }}
      placeholder="Press Enter to send message"
      footer={({ components }) => {
        const { SendButton, LoadingButton, SpeechButton } = components;
        return (
          <Flex justify="space-between" align="center">
            <Flex gap="small" align="center">
              <Button style={iconStyle} type="text" icon={<LinkOutlined />} />
              <Divider type="vertical" />
              Deep Thinking
              <Switch size="small" />
              <Divider type="vertical" />
              <Button icon={<SearchOutlined />}>Global Search</Button>
            </Flex>
            <Flex align="center">
              <Button type="text" style={iconStyle} icon={<ApiOutlined />} />
              <Divider type="vertical" />
              <SpeechButton style={iconStyle} />
              <Divider type="vertical" />
              {loading ? (
                <LoadingButton type="default" />
              ) : (
                <SendButton type="primary" disabled={false} />
              )}
            </Flex>
          </Flex>
        );
      }}
      onSubmit={() => {
        setLoading(true);
        handleSend(value)
      }}
      onCancel={() => {
        setLoading(false);
      }}

      actions={false}
    />
  );
};

export default App;