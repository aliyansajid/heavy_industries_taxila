import CreateUserForm from "@/components/forms/CreateUserForm";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

const CreateUser = () => {
  return (
    <section>
      <TopHeader />
      <SectionHeader title="Create User" />
      <CreateUserForm />
    </section>
  );
};

export default CreateUser;
