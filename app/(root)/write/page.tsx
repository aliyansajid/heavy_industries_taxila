import WriteForm from "@/components/forms/WriteForm";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

const Write = () => {
  return (
    <section>
      <TopHeader />
      <SectionHeader title="Write Letter" />
      <WriteForm />
    </section>
  );
};

export default Write;
