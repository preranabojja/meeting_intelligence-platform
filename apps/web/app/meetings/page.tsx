import { prisma } from "@/lib/prisma";

export default async function MeetingsPage() {
  const meetings = await prisma.meeting.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Meetings</h1>

      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginTop: "1rem",
            borderRadius: "8px",
          }}
        >
          <h2>{meeting.title}</h2>
          <p>{meeting.createdAt.toString()}</p>
        </div>
      ))}
    </main>
  );
}