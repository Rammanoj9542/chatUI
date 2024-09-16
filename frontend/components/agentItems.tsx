'use client'

import * as React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'

import { buttonVariants } from './ui/button'
import { IconMessage, IconUsers } from './ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from './ui/tooltip'
import { useLocalStorage } from '../lib/hooks/use-local-storage'
import { type Chat } from '../lib/types'
import { cn } from '../lib/utils'
import { useRouter } from 'next/navigation'


interface AgentItemProps {
  index: number
  agentId: string
  agentName: string
  children: React.ReactNode
}

export function AgentItem({ index, agentId, agentName , children }: AgentItemProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = false
  const shouldAnimate = index === 0 && isActive 

  if (!agentName) return null

  return (
    <motion.div
      className="relative h-8"
      variants={{
        initial: {
          height: 0,
          opacity: 0
        },
        animate: {
          height: 'auto',
          opacity: 1
        }
      }}
      initial={shouldAnimate ? 'initial' : undefined}
      animate={shouldAnimate ? 'animate' : undefined}
      transition={{
        duration: 0.25,
        ease: 'easeIn'
      }}
    >
      <div className="mb-2 absolute left-2 top-1 flex size-6">
      </div>
      <button
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10',
          isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
        )}
        onClick={()=>router.push(`/${agentId}`)}
      >
        <div
          className="text-left relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={agentName}
        >
          <span className="whitespace-nowrap">
            {shouldAnimate ? (
              agentName.split('').map((character, index) => (
                <motion.span
                  key={index}
                  variants={{
                    initial: {
                      opacity: 0,
                      x: -100
                    },
                    animate: {
                      opacity: 1,
                      x: 0
                    }
                  }}
                  initial={shouldAnimate ? 'initial' : undefined}
                  animate={shouldAnimate ? 'animate' : undefined}
                  transition={{
                    duration: 0.25,
                    ease: 'easeIn',
                    delay: index * 0.05,
                    staggerChildren: 0.05
                  }}
                >
                  {character}
                </motion.span>
              ))
            ) : (
              <span>{agentName}</span>
            )}
          </span>
        </div>
      </button>
      {!isActive && <div className="absolute right-2 top-1">{children}</div>}
    </motion.div>
  )
}
