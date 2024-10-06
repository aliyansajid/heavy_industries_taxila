import { auth } from "@/auth";
import Inbox from "@/components/Inbox";
import { fetchInboxLetters } from "@/lib/fetchLetters";

const InboxPage = async () => {
  const session = await auth();

  const userId = session?.user.id;
  const letters = await fetchInboxLetters(userId as string);

  return <Inbox letters={letters} />;
};

export default InboxPage;
