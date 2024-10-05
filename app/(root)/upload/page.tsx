import UploadForm from "@/components/forms/UploadForm";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

const Upload = () => {
  return (
    <section>
      <TopHeader />
      <SectionHeader title="Upload Letter" />
      <UploadForm />
    </section>
  );
};

export default Upload;
