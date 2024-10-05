import SendRequestForm from "@/components/forms/SendRequestForm";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

const SendRequest = () => {
  return (
    <section>
      <TopHeader />
      <SectionHeader title="Send Request" />
      <SendRequestForm />
    </section>
  );
};

export default SendRequest;
