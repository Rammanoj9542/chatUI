import { auth } from '@/auth'
import LoginForm from '@/components/login-form'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import { createRedisInstance } from '../../redis'


export default async function LoginPage() {
  createRedisInstance()
  
  const session = (await auth()) as Session
  
  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  )
}
