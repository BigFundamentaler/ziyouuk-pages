interface ChatMsg {
    /** 聊天内容 */
    content: string
    /** 用户角色 */
    role: 'AI' | 'User'
    id: number
}