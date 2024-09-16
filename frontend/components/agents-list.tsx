'use client'
import * as React from 'react';
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import { buttonVariants } from './ui/button'
import { getAgentIds } from '@/app/login/actions';
import { AnimatePresence, motion } from 'framer-motion'
import { AgentItem } from './agentItems';
import { AgentActions } from './agentActions';
import { removeAgent } from '@/app/(chat)/agent/actions';

interface AgentProps {
    userId: string
    agents: any
  }
export  function AgentsList ({userId,agents}:AgentProps) {

    return (
        <>
        <div className="flex-1 overflow-auto mb-2">
        <AnimatePresence>
        { agents ? (
          <div className="space-y-2 px-2">
            {Object.entries(agents).map(([key,value],index)=>(
            <motion.div
            key={key}
            exit={{
              opacity: 0,
              height: 0
            }}
          >
            <AgentItem index={index} agentId={key} agentName={JSON.parse(value)?.Name}>
                <AgentActions
                  userId={userId}
                  agentId={key}
                  removeAgent={removeAgent}
                />
              </AgentItem>
            </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No Agents</p>
          </div>
        )}
        </AnimatePresence>
      </div>
        </>
    )
}
