import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { initializeInstances } from '@/app/login/actions'
import { getUserAgents } from './actions'
import { nanoid } from '@/lib/utils'
import { getAgentQuestions } from '@/app/(chat)/[agentid]/actions'


export interface AgentPageProps {
  params: {
    agentid: string
  }
}

export default async function AgentPage({ params }: AgentPageProps) {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session?.user) {
    redirect(`/login?next=/${params.agentid}`)
  }
  const id: string=nanoid()
  const userId = session.user.id as string
  const agents = await getUserAgents(userId)
  if (!agents) {
    redirect('/')
  }

  if (!(params.agentid in agents)) {
    notFound()
  }
  const agentInfo = JSON.parse(agents[params.agentid])
  await initializeInstances(params.agentid, userId)
  const questions = await getAgentQuestions(session.user.id, params.agentid)

  return (
    <AI initialAIState={{agentId: params.agentid, chatId: id, messages: [] }}>
      <Chat
      agentId={params.agentid}
      agentInfo={agentInfo}
        id={id}
        session={session}
        missingKeys={missingKeys}
        questions={questions}
      />
    </AI>
  )
}