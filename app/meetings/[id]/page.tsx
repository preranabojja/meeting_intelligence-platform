import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MeetingPage({
  params,
}: Props) {
  const { id } = await params;

  const meeting = await prisma.meeting.findUnique({
    where: {
      id,
    },
  });

  if (!meeting) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
          <h1 className="text-5xl font-bold">
            {meeting.title}
          </h1>

          <p className="mt-4 text-zinc-400">
            {new Date(
              meeting.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              AI Summary
            </h2>

            <div className="whitespace-pre-wrap text-zinc-300">
              {meeting.summary ||
                "No summary available"}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Action Items
            </h2>

            <div className="whitespace-pre-wrap text-zinc-300">
              {meeting.actionItems ||
                "No action items extracted yet"}
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Decisions
          </h2>

          <div className="whitespace-pre-wrap text-zinc-300">
            {meeting.decisions ||
              "No decisions extracted yet"}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Transcript
          </h2>

          <div className="max-h-[500px] overflow-y-auto whitespace-pre-wrap text-zinc-300">
            {meeting.transcript ||
              "No transcript uploaded"}
          </div>
        </div>
      </div>
    </main>
  );
}