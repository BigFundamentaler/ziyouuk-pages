import { MastraClient } from "@mastra/client-js";
const DEEPSEEK_WORKER_URL = import.meta.env.VITE_DEEPSEEK_WORKER_URL || ''

const AGENT_WORKER_URL = import.meta.env.VITE_AGENT_WORKER_URL || ''

const mastraClient = new MastraClient({
  baseUrl: AGENT_WORKER_URL
});

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string
}
export async function chatWithDeepSeek(messages: Message[]) {
  const query = `
    mutation ChatWithDeepSeek($messages: [MessageInput!]!) {
      chatWithDeepSeek(messages: $messages)
    }
  `
  const variables = {
    messages: messages
  }
  try {
    const response = await fetch(DEEPSEEK_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
    const result = await response.json()
    return result.data?.chatWithDeepSeek
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : `Unknown error: ${error}`
    throw new Error(errMsg)
  }
}

export async function chatWithGPT(messages: Message[]) {
  try {
    const agent = mastraClient.getAgent("CodeReviewAgent");
    const result: any = await agent.generate({ messages: messages })
    return result.response.body.choices[0].message.content
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : `Unknown error: ${error}`
    throw new Error(errMsg)
  }
}
