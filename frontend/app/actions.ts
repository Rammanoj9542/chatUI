'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'
import { createRedisInstance } from '../redis'

const redis = createRedisInstance();

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }
  
  try {
    const chats: string[] = await redis.zrevrange(`user:chat:${userId}`, 0, -1)
  
    const chatData = [];
    for (const chat of chats) {
      const data = await redis.hgetall(chat);
      const messages = JSON.parse(data.messages)
      data.messages = messages
      chatData.push(data);
    }
    return chatData;
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await redis.hgetall(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }
  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  //Convert uid to string for consistent comparison with session.user.id
  const uid = String(await redis.hget(`chat:${id}`, 'userId'))

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  await redis.del(`chat:${id}`)
  await redis.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await redis.zrange(`user:chat:${session.user.id}`, 0, -1)
  if (!chats.length) {
    return redirect('/')
  }
  const pipeline = redis.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.id}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  const chat = await redis.hgetall(`chat:${id}`)
  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chat = await redis.hgetall(`chat:${id}`)

  if (!chat || chat.userId !== session.user.id) {
    return {
      error: 'Something went wrong'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await redis.hmset(`chat:${chat.id}`, payload)

  return payload
}

export async function saveChat(chat: Chat) {
  const session = await auth()
  const redis = createRedisInstance();


  if (session && session.user) {
    // const pipeline = kv.pipeline()
    // pipeline.hmset(`chat:${chat.id}`, chat)
    // pipeline.zadd(`user:chat:${chat.userId}`, {
    //   score: Date.now(),
    //   member: `chat:${chat.id}`
    // })
    // await pipeline.exec()
    // Serialize messages array to JSON
    const serializedChat = { ...chat, messages: JSON.stringify(chat.messages) };
    redis.hmset(`chat:${chat.id}`, serializedChat).then(() => {
      // Successfully set chat object in Redis hash
    }).catch((error) => {
      console.error('Error setting chat object:', error);
    });
    
    // Assuming you want to add a member with the current timestamp as score
    redis.zadd(`user:chat:${chat.userId}`, Date.now(), `chat:${chat.id}`).then(() => {
      // Successfully added member to sorted set
    }).catch((error) => {
      console.error('Error adding member to sorted set:', error);
    });
  } else {
    return
  }
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
