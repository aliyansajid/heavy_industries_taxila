"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState, useEffect } from "react";
import { createDepartmentSchema } from "@/lib/utils";
import { z } from "zod";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Employee = {
  id: string;
  name: string;
};

const CreateDepartmentForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const formSchema = createDepartmentSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-users`
        );
        const result = await response.json();

        if (!response.ok) {
          toast({
            description: result.message,
            variant: "destructive",
          });
        } else {
          setEmployees(result.users);
        }
      } catch (error) {
        console.error("Error fetching employees: ", error);
        toast({
          description: "There was an error fetching the employees.",
          variant: "destructive",
        });
      }
    };

    fetchEmployees();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/create-department`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast({
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: result.message,
          variant: "default",
        });
        form.reset({
          name: "",
          description: "",
          employees: [],
        });
      }
    } catch (error) {
      console.error("Error during department creation: ", error);
      toast({
        description: "There was an error creating the department.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-1/2 p-8"
        >
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter department name"
          />

          <CustomFormField
            fieldType={FormFieldType.MULTI_SELECT}
            control={form.control}
            name="employees"
            label="Employees"
            placeholder="Select employees"
            options={employees.map((emp) => ({
              label: emp.name,
              value: emp.id,
            }))}
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label="Description"
            placeholder="Enter description"
          />

          <CustomButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            iconSrc={Plus}
            text={"Create"}
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateDepartmentForm;
