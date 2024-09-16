export interface EmptyProps {
  agentInfo: any
}
export function EmptyScreen({ agentInfo }: EmptyProps) {
  return (
    <div className="mx-auto sm:max-w-2xl sm:px-4">
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex h-full flex-col items-center justify-center text-token-text-primary">
        <div className="relative">
          <div className="mb-3 h-12 w-12"><div className="gizmo-shadow-stroke overflow-hidden rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2"><div className="text-center text-2xl font-semibold">{agentInfo?.Name}</div>
          <div className="flex items-center gap-1 text-token-text-tertiary">
            <div className="mt-1 flex flex-row items-center space-x-1">
              {/* <div className="text-sm text-token-text-tertiary">By khanacademy.org</div> */}
              <div><div className="my-2" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rfo:" data-state="closed">
                {/* <div className="flex items-center gap-1 rounded-xl bg-token-main-surface-secondary px-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon-xs text-token-text-secondary"><path fill="currentColor" fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m9.985-7.997a.3.3 0 0 0-.064.03c-.13.08-.347.291-.596.744-.241.438-.473 1.028-.674 1.756-.336 1.22-.567 2.759-.632 4.467h3.962c-.065-1.708-.296-3.247-.632-4.467-.201-.728-.433-1.318-.674-1.756-.25-.453-.466-.665-.596-.743a.3.3 0 0 0-.064-.031L12 4q-.003 0-.015.003M8.018 11c.066-1.867.316-3.588.705-5 .15-.544.325-1.054.522-1.513A8.01 8.01 0 0 0 4.062 11zm-3.956 2h3.956c.077 2.174.404 4.156.912 5.68q.144.435.315.833A8.01 8.01 0 0 1 4.062 13m5.957 0c.076 1.997.378 3.757.808 5.048.252.756.53 1.296.79 1.626.128.162.232.248.302.29q.049.03.066.033L12 20l.015-.003a.3.3 0 0 0 .066-.032c.07-.043.174-.13.301-.291.26-.33.539-.87.79-1.626.43-1.29.732-3.05.809-5.048zm5.963 0c-.077 2.174-.404 4.156-.912 5.68q-.144.435-.315.833A8.01 8.01 0 0 0 19.938 13zm3.956-2a8.01 8.01 0 0 0-5.183-6.513c.197.46.371.969.522 1.514.389 1.41.639 3.132.705 4.999z" clip-rule="evenodd"></path></svg>
                </div> */}
              </div>
              </div>
            </div>
          </div>
          <div className="max-w-md text-center text-sm font-normal text-token-text-primary">{agentInfo?.Description}</div>
          {/* <div className="mx-3 mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-4">

            <button className="relative flex w-40 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[15px] shadow-[0_0_2px_0_rgba(0,0,0,0.05),0_4px_6px_0_rgba(0,0,0,0.02)] transition hover:bg-token-main-surface-secondary"><div className="line-clamp-3 text-balance text-gray-600 dark:text-gray-500 break-word">Give me 10 practice problems!</div></button>
            <button className="relative flex w-40 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[15px] shadow-[0_0_2px_0_rgba(0,0,0,0.05),0_4px_6px_0_rgba(0,0,0,0.02)] transition hover:bg-token-main-surface-secondary"><div className="line-clamp-3 text-balance text-gray-600 dark:text-gray-500 break-word">How are you different than regular Khanmigo?</div></button>
          </div> */}
        </div>
      </div>
    </div>
     </div>
  )
}