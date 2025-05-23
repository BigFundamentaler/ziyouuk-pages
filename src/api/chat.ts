const DEEPSEEK_WORKER_URL = process.env.REACT_APP_DEEPSEEK_WORKER_URL || ''
interface Message {
  role: string
  content: string
}
export async function chatWithDeepSeek(messages: Message[]) {
  console.log('DEEPSEEK_WORKER_URL:',DEEPSEEK_WORKER_URL)
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
