import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SidebarList } from '@/components/sidebar-list'
import { buttonVariants } from '@/components/ui/button'
import { IconPlus } from '@/components/ui/icons'
import { AgentsList } from '@/components/agents-list'
import { agentsInfo } from '@/app/(chat)/agent/actions';
import { cache } from 'react'

const loadAgents = cache(async (userId?: string) => {
  return await agentsInfo(userId)
})
interface ChatHistoryProps {
  userId?: string
}

export async function ChatHistory({ userId }: ChatHistoryProps) {
  const agents: any = await loadAgents(userId);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 px-2">
        <Link
          href="/agent"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
          )}
        >
          {/* <IconPlus className="-translate-x-2 stroke-2" /> */}
          Agents
        </Link>
      </div>
      <div className="flex flex-col px-4 space-y-4 overflow-auto">
        <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <AgentsList userId={userId} agents={agents} />
      </React.Suspense>
      </div>
      
      <div className="mb-2 px-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          New Chat
        </Link>
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <SidebarList userId={userId} />
      </React.Suspense>
    </div>
  )
}
