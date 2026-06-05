"use client";

import { useState } from "react";
import Link from "next/link";

type Meeting = {
  id: string;
  title: string;
  createdAt: string | Date;
};

export default function MeetingSearch({
  meetings,
}: {
  meetings: Meeting[];
}) {
  const [query, setQuery] = useState("");

  const filtered = meetings.filter((meeting) =>
    meeting.title
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search meetings..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
      />

      <div className="space-y-4">
        {filtered.map((meeting) => (
          <Link
            key={meeting.id}
            href={`/meetings/${meeting.id}`}
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            <h3 className="text-xl font-semibold">
              {meeting.title}
            </h3>

            <p className="mt-2 text-zinc-400">
              {new Date(
                meeting.createdAt
              ).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}