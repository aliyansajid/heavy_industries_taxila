import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "@/components/DataTable/Columns";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

type InboxProps = {
  letters: Array<{
    id: string;
    subject: string;
    reference: string;
    priority: string;
    createdAt: string;
  }>;
};

const Inbox = ({ letters }: InboxProps) => {
  const data = letters.map((letter) => ({
    ...letter,
    date: letter.createdAt ? new Date(letter.createdAt) : new Date(),
  }));

  return (
    <section>
      <TopHeader />
      <SectionHeader title="Inbox" />
      <DataTable data={data} columns={columns} />
    </section>
  );
};

export default Inbox;
