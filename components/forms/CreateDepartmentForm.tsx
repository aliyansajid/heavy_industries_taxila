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

type Employee = {
  id: string;
  name: string;
};

const CreateDepartmentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formSchema = createDepartmentSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Error fetching employees");
      }
    };

    fetchEmployees();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error creating department");
      }

      const data = await response.json();
      setSuccessMessage("Department created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error during department creation:", error);
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
          {error && <p className="text-red-500">{error}</p>}

          {successMessage && <p className="text-green-500">{successMessage}</p>}

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
