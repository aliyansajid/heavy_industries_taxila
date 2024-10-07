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
    <section>
      <TopHeader />
      <SectionHeader title={`Subject: ${letter.subject}`} />

      <div className="flex w-full">
        <div className="w-3/4">
          <LetterTabs letter={letter} />
        </div>

        <div className="w-1/4 border-l p-8">
          <h1 className="py-3 font-medium">Remarks</h1>
          <div className="flex flex-col">
            <AddRemarks letterId={id} />
            <div className="remarks-section mt-4">
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
