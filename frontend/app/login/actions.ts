'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { ResultCode } from '@/lib/utils'
import { createRedisInstance } from '../../redis'
import axios from 'axios'

const BackendServiceIp = process.env.BackendServiceIp
const BackendServicePort = process.env.BackendServicePort

const IP_ADDRESS = `http://${BackendServiceIp}:${BackendServicePort}`;

const redis = createRedisInstance();


export async function getUser(email: string) {
  const user = await redis.hgetall(`user:${email}`)
  return user
}

export async function getAgent(userId: string) {
  try {
    const data = {
      userId:  userId,
      sessionId: userId,
      hierarchyId: 'xyac',
      role: 'R1'
    }
    const response = await axios.post(`${IP_ADDRESS}/chatbot/getAgentIds`, data);
    const agents = response.data.agentIds

    const jsonStringifiedAgents: any = {};

    for (const key in agents) {
      if (agents.hasOwnProperty(key)) {
        jsonStringifiedAgents[key] = JSON.stringify(agents[key]);
      }
    }
    await redis.hmset(`user:${userId}`, jsonStringifiedAgents).catch((error) => {
        console.error('Error setting agent object:', error);
      });
    const items = Object.entries(agents);
    const agentInfo = items[0];
    const result: any = await initializeInstances(agentInfo[0], userId)
    if (result.status_code === 200) {
      return agentInfo
    } else {
      return null
      // return ['A1','resume']
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    return null
  }
}

export async function initializeInstances(agentId: string, userId: string) {
  const data = {
    userId: userId,
    sessionId: userId,
    role: 'R1',
    hierarchyId: 'xyac',
    agentId: agentId
  }
  try {
    const response1 = await axios.post(`${IP_ADDRESS}/chatbot/initializeInstances`, data);
    if (response1.data.status_code == 200) {
      return response1.data
    } else {
      return response1.data
    }
  }
  catch (error: any) {
    console.error('Error:', error.message);
    return 500
  }
}


interface Result {
  type: string
  resultCode: ResultCode
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6)
      })
      .safeParse({
        email,
        password
      })

    if (parsedCredentials.success) {
      await signIn('credentials', {
        email,
        password,
        redirect: false
      }).then(response => {
        console.log("Sign-in response:", response);
      }).catch(error => {
        console.error("Sign-in error:", error);
      });

      return {
        type: 'success',
        resultCode: ResultCode.UserLoggedIn
      }
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.InvalidCredentials
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials
          }
        default:
          return {
            type: 'error',
            resultCode: ResultCode.UnknownError
          }
      }
    }
  }
}