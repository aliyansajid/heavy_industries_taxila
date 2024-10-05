import SendForm from "@/components/forms/SendForm";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

const Send = () => {
  return (
    <section>
      <TopHeader />
      <SectionHeader title="Send Letter" />
      <SendForm />
    </section>
  );
};

export default Send;
