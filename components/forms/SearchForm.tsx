"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";

const formSchema = z.object({
  search: z
    .string({ required_error: "Please enter a search term" })
    .max(50, "Search term cannot be more than 50 characters"),
  selectField: z.string({ required_error: "Please select a value" }),
});

const SearchForm = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectField: "Reference",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              <SelectItem value="Reference">Reference</SelectItem>
              <SelectItem value="Subject">Subject</SelectItem>
            </CustomFormField>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
