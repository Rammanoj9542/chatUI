'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

import { ServerActionResult, type Chat } from '../lib/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { IconSpinner, IconTrash } from './ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from './ui/tooltip'

interface SidebarActionsProps {
  userId : string
  agentId: string
  removeAgent: (args: { userId: string, agentId: string}) => ServerActionResult<void>
}

export function AgentActions({
  userId,
  agentId,
  removeAgent,
}: SidebarActionsProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [isRemovePending, startRemoveTransition] = React.useTransition()

  return (
    <>
      <div className="">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-7 p-0 hover:bg-background"
              disabled={isRemovePending}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <IconTrash />
              <span className="sr-only">Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Agent</TooltipContent>
        </Tooltip>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your Agent and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isRemovePending}
              onClick={event => {
                event.preventDefault()
                // @ts-ignore
                startRemoveTransition(async () => {
                  const result = await removeAgent(userId,agentId)
                  if (result && 'error' in result) {
                    toast.error(result.error)
                    return
                  }

                  setDeleteDialogOpen(false)
                  router.push('/')
                  router.refresh()
                  toast.success('Agent deleted')
                })
              }}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
