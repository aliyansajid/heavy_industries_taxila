import CreateDepartmentForm from "@/components/forms/CreateDepartmentForm";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

const CreateDepartment = () => {
  return (
    <section>
      <TopHeader />
      <SectionHeader title="Create Department" />
      <CreateDepartmentForm />
    </section>
  );
};

export default CreateDepartment;
