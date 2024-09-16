'use client'
import * as React from 'react';
import { getAgentIds } from '@/app/(chat)/agent/actions';
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor';
import { saveAgentInfo } from '@/app/(chat)/agent/actions';
import { useRouter } from 'next/navigation'


interface AgentProps {
    userId: string
  }
export function Agents({userId}:AgentProps) {
    const [agentsOpen, setAgentsOpen] = React.useState(false);
    const [agentIds, setAgentIds] = React.useState({});
    const [agentId, setAgentId] = React.useState('')
    const router = useRouter()

    React.useEffect(() => {
        async function ids() {
            const data: any = await getAgentIds(userId);
            setAgentIds(data);
        }
        ids();
    }, [])
    const   {scrollRef } = useScrollAnchor()
    return (
        <div
            className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
            ref={scrollRef}
        >
            <div className="mb-6 ">
                <div className="mx-auto max-w-3xl overflow-x-clip px-4">
                    <div className="mb-6">
                        <div className="my-2 text-center text-3xl font-bold md:my-4 md:text-5xl">Agents</div>
                            <div className='grid grid-cols-1 gap-x-1.5 gap-y-1 md:gap-x-2 md:gap-y-1.5 lg:grid-cols-2 lg:gap-x-3 lg:gap-y-2.5'>
                                {Object.entries(agentIds).map(([key, value]: any) =>
                                    <div key={key} className="mb-2 grid grid-cols-1 gap-y-1.5 md:gap-y-2 lg:gap-y-3 ">
                                        <div style={{ opacity: 1, transform: 'none' }} className='flex items-center justify-center'>
                                            <button onClick={
                                                async()=>{
                                                    await saveAgentInfo(userId,key,JSON.parse(value))
                                                }} className="cursor-pointer group flex h-24 w-full min-w-[360px] items-center gap-5 overflow-hidden rounded-xl bg-black/5 px-7 py-8 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 md:h-32 lg:h-36 lg:w-80">
                                                <div className="h-16 w-16 flex-shrink-0 md:h-24 md:w-24">
                                                    <div className="gizmo-shadow-stroke overflow-hidden rounded-full"></div>
                                                </div>
                                                <div className="flex flex-col"><div className="text-left line-clamp-2 font-semibold md:text-lg">{JSON.parse(value)?.Name}</div>
                                                    <span className="text-left line-clamp-2 text-xs md:line-clamp-3">{JSON.parse(value)?.Description}</span>
                                                    <div className="mt-1 line-clamp-1 flex justify-start gap-1 text-xs text-token-text-tertiary">
                                                        <div className="mt-1 flex flex-row items-center space-x-1">
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                    </div>
                </div>

            </div>
        </div>
    )
}