import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    // Create JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" })

    return NextResponse.json({ token })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

