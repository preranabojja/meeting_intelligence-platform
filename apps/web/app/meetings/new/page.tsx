"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMeetingPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

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
      }),
    });

    router.push("/meetings");
    router.refresh();
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Create Meeting</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meeting title"
        />

        <br />
        <br />

        <button type="submit">
          Create Meeting
        </button>
      </form>
    </main>
  );
}