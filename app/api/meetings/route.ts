import { prisma } from "@/lib/prisma";
import { openai } from "@/lib/openai";
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

  console.log("BODY:", body);

  const user = await prisma.user.upsert({
    where: {
      email: "demo@example.com",
    },
    update: {},
    create: {
      email: "demo@example.com",
    },
  });

  let summary = "";

  if (body.transcript?.trim()) {
    try {
      const response = await openai.responses.create({
        model: "gpt-5-nano",
        input: `
Analyze this meeting transcript.

Return:

SUMMARY:
- concise bullet points

ACTION ITEMS:
- bullet points

DECISIONS:
- bullet points

Transcript:
${body.transcript}
`,
      });

      summary = response.output_text;
    } catch (error) {
      console.error("OpenAI Error:", error);

      summary =
        "Summary unavailable. OpenAI API quota exceeded or request failed.";
    }
  }

  const meeting = await prisma.meeting.create({
    data: {
      title: body.title,
      transcript: body.transcript,
      summary,
      userId: user.id,
    },
  });

  return NextResponse.json(meeting);
}