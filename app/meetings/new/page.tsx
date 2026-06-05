"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMeetingPage() {
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");

  const router = useRouter();

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const text = await file.text();

    setTranscript(text);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await fetch("/api/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        transcript,
      }),
    });

    router.push("/meetings");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-8 py-10">
        <h1 className="mb-8 text-4xl font-bold">
          Create Meeting
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Meeting Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Sprint Planning"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Upload Transcript (.txt)
            </label>

            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="block w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Transcript
            </label>

            <textarea
              rows={14}
              value={transcript}
              onChange={(e) =>
                setTranscript(e.target.value)
              }
              placeholder="Paste transcript here..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            Create Meeting
          </button>
        </form>
      </div>
    </main>
  );
}