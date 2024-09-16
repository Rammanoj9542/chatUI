import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { getAgent } from '../login/actions'
import { redirect } from 'next/navigation'
import { getAgentQuestions } from '@/app/(chat)/[agentid]/actions'



export const metadata = {
  title: ' AI Chatbot'
}
export default async function IndexPage() {
  const session = (await auth()) as Session
  if (!session) {
    redirect('/login')
  }
  const agent: any =await getAgent(session.user.id)
  const agentId = agent[0]
  const agentInfo =agent[1]
  const id = nanoid()
  const missingKeys = await getMissingKeys()
  const questions = await getAgentQuestions(session.user.id, agentId)

  return (
    <AI initialAIState={{ agentId: agentId, chatId: id, messages: [] }}>
      <Chat agentId={agentId} agentInfo={agentInfo} id={id} session={session} missingKeys={missingKeys} questions={questions} />
    </AI>
  )
}