'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import * as React from 'react'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  agentId: any
  agentInfo: any
  id?: string
  session?: Session
  missingKeys: string[]
  questions: any
}

export function Chat({ agentId, agentInfo, id, className, session, missingKeys, questions }: ChatProps) {
  const userId: any = session?.user.id
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} show={show} isShared={false} session={session} />
        ) : (
          <EmptyScreen agentInfo={agentInfo} />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        sessionId={userId}
        agentId={agentId}
        id={id}
        input={input}
        setInput={setInput}
        setShow={setShow}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        questions={questions}
      />
    </div>
  )
}