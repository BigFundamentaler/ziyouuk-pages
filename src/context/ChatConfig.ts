import { createContext, useContext } from 'react';
interface ChatContextType {
    isCodeReview: boolean;
    setReviewState: (checked: boolean) => void
}
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatConfig = () => {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChatConfig must be used within an chatContext.provider');
    }
    return context;
}
