import { prisma } from "@/lib/prisma";
import Link from "next/link";
import MeetingSearch from "@/components/MeetingSearch";

export default async function MeetingsPage() {
  const meetings = await prisma.meeting.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Meeting Intelligence
            </h1>

            <p className="mt-3 text-zinc-400">
              AI-powered meeting insights
            </p>
          </div>

          <Link
            href="/meetings/new"
            className="rounded-xl bg-white px-5 py-3 font-medium text-black"
          >
            + New Meeting
          </Link>
        </div>

        <MeetingSearch meetings={meetings} />
      </div>
    </main>
  );
}