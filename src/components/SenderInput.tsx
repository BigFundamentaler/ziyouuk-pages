import { ApiOutlined, LinkOutlined, SearchOutlined } from '@ant-design/icons';
import { Sender } from '@ant-design/x';
import { Button, Divider, Flex, Switch, theme } from 'antd';
import React, { useState } from 'react';
import {useChatConfig} from '../context/ChatConfig';
interface ChildProps {
    onSubmitClick: (val: string, callback?: () => void) => Promise<void>;
}
const SenderInput: React.FC<ChildProps> = ({ onSubmitClick }) => {
    const { token } = theme.useToken();
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const {isCodeReview,setReviewState} = useChatConfig()
    const onChangeSwitch= (checked:boolean)=>{
        setReviewState(checked)
    }
    const iconStyle = {
        fontSize: 18,
        color: token.colorText,
    };

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
                            Code Review
                            <Switch size="small" checked={isCodeReview} onChange={onChangeSwitch}/>
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
            onSubmit={async () => {
                try {
                    setLoading(true);
                    const v = value
                    setValue('')
                    await onSubmitClick(v)
                    setLoading(false);
                } catch (error) {

                }
            }}
            onCancel={() => {
                setLoading(false);
            }}
            actions={false}
        />
    );
};

export default SenderInput;