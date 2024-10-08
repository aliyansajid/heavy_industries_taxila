import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import SearchCard from "../SearchCard";

const SearchAttachment = ({
  onAttachmentSelected,
}: {
  onAttachmentSelected: (fileLocation: string) => void;
}) => {
  const { toast } = useToast();
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const formSchema = z.object({
    search: z.string({ required_error: "Please enter a search term" }),
    selectField: z.string({ required_error: "Please select a value" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectField: "Subject",
    },
  });

  const fetchSearchResults = async (search: string, selectField: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search/search-attachments?search=${search}&field=${selectField}`
      );
      const data = await response.json();
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      toast({
        description: "TThere was an error fetching the results.",
        variant: "destructive",
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetchSearchResults(values.search, values.selectField);
  }

  function handleAttachmentClick(fileLocation: string) {
    onAttachmentSelected(fileLocation);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex gap-4">
          <div>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="search"
              placeholder="Search by reference or subject"
            />
          </div>
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="selectField"
              placeholder="Select an option"
            >
              <SelectItem value="Subject">Subject</SelectItem>
              <SelectItem value="Reference">Reference</SelectItem>
            </CustomFormField>
          </div>
        </div>
      </form>

      {hasSearched && (
        <>
          {results.length > 0 ? (
            <>
              {results.map((result: any, index: number) => (
                <div key={result.id}>
                  <SearchCard
                    id={result.id}
                    subject={result.subject}
                    reference={result.reference}
                    onClick={() => handleAttachmentClick(result.fileLocation)}
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="text-dark-secondary">No results found</p>
          )}
        </>
      )}
    </Form>
  );
};

export default SearchAttachment;
