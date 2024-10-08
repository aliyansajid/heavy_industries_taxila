import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";
import LetterTabs from "@/components/LetterTabs";
import AddRemarks from "@/components/forms/AddRemarks";

const LetterDetail = async ({ params: { id } }: { params: { id: string } }) => {
  let letter = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/letters/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      console.error("Failed to fetch letter data");
      return null;
    }

    letter = await response.json();
  } catch (err: any) {
    console.error("Error fetching letter: ", err);
  }

  return (
    <section className="min-h-screen flex flex-col">
      <TopHeader />
      <SectionHeader title={`Subject: ${letter.subject}`} />
      <SectionHeader title={`Reference: ${letter.reference}`} />

      <div className="flex w-full flex-grow">
        <div className="w-3/4">
          <LetterTabs letter={letter} />
        </div>

        <div className="w-1/4 border-l p-8 flex flex-col">
          <h1 className="font-medium">Remarks</h1>
          <div className="flex flex-col mt-3 flex-grow">
            <AddRemarks letterId={id} />
            <div className="remarks-section mt-3 flex-grow">
              {letter.remarks.map((remark: string, index: number) => (
                <p key={index} className="text-dark-secondary mb-2">
                  {remark}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetterDetail;
