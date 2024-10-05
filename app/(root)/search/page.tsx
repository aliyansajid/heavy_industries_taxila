import SearchForm from "@/components/forms/SearchForm";
import SectionHeader from "@/components/SectionHeader";
import TopHeader from "@/components/TopHeader";

const Search = () => {
  return (
    <section>
      <TopHeader />
      <SectionHeader title="Search" />
      <div className="p-8">
        <SearchForm className="w-4/5" />
      </div>
    </section>
  );
};

export default Search;
