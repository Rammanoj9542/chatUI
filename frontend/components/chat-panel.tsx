'use client'
import * as React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CoverFlow.module.css';
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { useTheme } from 'next-themes'




export interface ChatPanelProps {
  sessionId: string
  agentId: string
  id?: string
  title?: string
  input: string
  setShow: (value: boolean) => void
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
  questions: any
}

export function ChatPanel({
  sessionId,
  agentId,
  id,
  title,
  setShow,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  questions
}: ChatPanelProps) {

  function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background:theme ==='light' ?'black':' ',borderRadius:'15px' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background:theme ==='light' ?'black':'',borderRadius:'15px' }}
      onClick={onClick}
    />
  );
}
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const { theme } = useTheme()
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '1',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        {messages.length === 0 && questions.length !== 0 &&
            <div >
          <Slider {...settings} className={theme === 'dark' ? 'dark' : ''}>
            {questions.map((example:string, index:number) => (
              <div
                key={example}
                className={`min-h-[120px] cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${index > 1 && 'hidden md:block'
                  }`}
                onClick={async () => {
                  setShow(true)
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example}</UserMessage>
                    }
                  ])

                  const responseMessage = await submitUserMessage(sessionId,
                    agentId,
                    id,
                    example
                  )
                  setShow(false)
                  setMessages(currentMessages => [
                    ...currentMessages,
                    responseMessage
                  ])
                }}
              >
                <div className="text-sm font-semibold">{example}</div>
              </div>
            ))}
          </Slider>
          </div>
        }

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm sessionId={sessionId} setShow={setShow} agentId={agentId} id={id} input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  )
}
