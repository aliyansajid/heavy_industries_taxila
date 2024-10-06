import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "@/components/DataTable/Columns";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";
import fs from "fs";
import path from "path";

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "components",
    "DataTable",
    "data.json"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

const Inbox = async () => {
  const data = await getData();

  return (
    <section>
      <TopHeader />
      <SectionHeader title="Inbox" />
      <DataTable data={data} columns={columns} />
    </section>
  );
};

export default Inbox;
