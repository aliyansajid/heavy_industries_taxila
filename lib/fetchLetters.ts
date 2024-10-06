export async function fetchInboxLetters(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/letters/get-letters/${userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch letters");
  }

  const data = await res.json();
  return data.letters;
}
