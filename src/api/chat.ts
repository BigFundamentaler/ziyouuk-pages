export async function sendChatMessage(userInput:any) {
  const WORKER_URL = "https://ziyouuk-worker.workingxw.workers.dev";
  
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        mutation SendMessage($input: ChatInput!) {
          sendMessage(input: $input) {
            text
            timestamp
          }
        }
      `,
      variables: {
        input: {
          text: userInput,
          userId: "当前用户ID" // 根据实际需求替换
        }
      }
    })
  });

  if (!response.ok) throw new Error("Network error");
  return await response.json();
}