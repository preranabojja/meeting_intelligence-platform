import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const meetings = await prisma.meeting.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(meetings);
}

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.upsert({
    where: {
      email: "demo@example.com",
    },
    update: {},
    create: {
      email: "demo@example.com",
    },
  });

  const meeting = await prisma.meeting.create({
    data: {
      title: body.title,
      userId: user.id,
    },
  });

  return NextResponse.json(meeting);
}
