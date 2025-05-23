import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { Bubble, BubbleProps } from '@ant-design/x';
import markdownit from 'markdown-it';
const md = markdownit({ html: true, breaks: true });
interface ChildProps {
    msgList: ChatMsg[];
}
const fooAvatar: React.CSSProperties = {
    color: '#f56a00',
    backgroundColor: '#fde3cf',
};

const barAvatar: React.CSSProperties = {
    color: '#fff',
    backgroundColor: '#87d068',
};
const renderMarkdown: BubbleProps['messageRender'] = (content) => {
    return (
        <Typography>
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
            <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
        </Typography>
    );
};
const App: React.FC<ChildProps> = ({ msgList }) => (
    <Flex gap="middle" vertical flex="1">
        {msgList.map(item => (
            item.role === 'AI' ? (
                <Bubble
                    key={item.id}
                    placement="start"
                    content={item.content}
                    messageRender={renderMarkdown}
                    avatar={{ icon: <UserOutlined />, style: fooAvatar }}
                    header="agent"
                    typing={{interval:50}}
                />
            ) : (
                <Bubble
                    key={item.id}
                    placement="end"
                    content={item.content}
                    avatar={{ icon: <UserOutlined />, style: barAvatar }}
                />
            )
        ))}
    </Flex>
);

export default App;