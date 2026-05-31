import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

export interface JWTPayload {
  userId: number
  email: string
  role: string
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function getTokenFromRequest(req: NextRequest): JWTPayload | null {
  const token = req.cookies.get('finku-token')?.value
  if (!token) return null
  return verifyToken(token)
}

export function getAdminTokenFromRequest(req: NextRequest): JWTPayload | null {
  const payload = getTokenFromRequest(req)
  if (payload && payload.role === 'ADMIN') {
    return payload
  }
  return null
}
