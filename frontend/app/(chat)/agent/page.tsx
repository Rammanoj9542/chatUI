import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import { Agents } from '@/components/agents'


export default async function AgentPage() {
  const session = (await auth()) as Session
    if(!session){
      redirect('/')
    }
  return (<>
    <Agents userId={session.user.id} />
    </>
  )
}
