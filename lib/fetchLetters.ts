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

export async function fetchLetter(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/letters/get-letter/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch letter");
  }

  const data = await res.json();
  return data.letter;
}
