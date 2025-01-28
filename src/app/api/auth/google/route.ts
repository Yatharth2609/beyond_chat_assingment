import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    const { sub: googleId, email, name } = payload

    let user = await prisma.user.findUnique({ where: { email: email! } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name!,
          email: email!,
          googleId: googleId!,
        },
      })
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: googleId! },
      })
    }

    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" })

    return NextResponse.json({ token: jwtToken })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

