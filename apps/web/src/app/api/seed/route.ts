import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await prisma.user.create({
    data: {
      email: `demo-${Date.now()}@example.com`,
    },
  });

  const meeting = await prisma.meeting.create({
    data: {
      title: "Weekly Team Sync",
      userId: user.id,
    },
  });

  return NextResponse.json({
    user,
    meeting,
  });
}