"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import SearchCard from "../SearchCard";

const formSchema = z.object({
  search: z
    .string({ required_error: "Please enter a search term" })
    .max(50, "Search term cannot be more than 50 characters"),
  selectField: z.string({ required_error: "Please select a value" }),
});

const SearchForm = ({ className }: { className?: string }) => {
  const { toast } = useToast();
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectField: "Subject",
    },
  });

  const fetchSearchResults = async (search: string, selectField: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search?search=${search}&field=${selectField}`
      );
      const data = await response.json();
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching search results: ", error);
      toast({
        description: "There was an error fetching the results.",
        variant: "destructive",
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetchSearchResults(values.search, values.selectField);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex gap-4">
          <div className={className}>
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
        <div className="mt-8">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result: any) => (
                <SearchCard
                  key={result.id}
                  id={result.id}
                  subject={result.subject}
                  reference={result.reference}
                  priority={result.priority}
                />
              ))}
            </div>
          ) : (
            <p className="text-dark-secondary">No results found</p>
          )}
        </div>
      )}
    </Form>
  );
};

export default SearchForm;
