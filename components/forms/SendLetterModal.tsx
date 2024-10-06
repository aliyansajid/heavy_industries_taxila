"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { z } from "zod";
import { sendLetterSchema } from "@/lib/utils";
import CustomButton, { ButtonVariant } from "../CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "../ui/select";
import ModalDialog from "../ModalDialog";
import { Send } from "lucide-react";

type Employee = {
  id: string;
  name: string;
};

type Department = {
  name: string;
  employees: Employee[];
};

const SendLetterModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const formSchema = sendLetterSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departmentSelected, setDepartmentSelected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchDepartments = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/departments`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          setDepartments(data);
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      };
      fetchDepartments();
    }
  }, [isOpen]);

  const handleDepartmentChange = (selectedDepartment: string) => {
    const department = departments.find(
      (dept: Department) => dept.name === selectedDepartment
    );
    if (department) {
      setEmployees(department.employees);
      setDepartmentSelected(true);
    } else {
      setEmployees([]);
      setDepartmentSelected(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <ModalDialog
      isOpen={isOpen}
      title="Send Letter"
      description="Select the department and employees to send the letter"
      onClose={() => setIsOpen(false)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="department"
            label="Department"
            placeholder="Select a department"
            onChange={(e: any) => handleDepartmentChange(e.target.value)}
          >
            {departments.map((dept: Department) => (
              <SelectItem key={dept.name} value={dept.name}>
                {dept.name}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.MULTI_SELECT}
            control={form.control}
            name="employees"
            label="Employees"
            placeholder="Select employees"
            disabled={!departmentSelected}
            options={employees.map((emp: Employee) => ({
              label: emp.name,
              value: emp.id,
            }))}
          />

          <CustomButton
            variant={ButtonVariant.DEFAULT}
            text={"Send"}
            className="w-full"
            iconSrc={Send}
          />
        </form>
      </Form>
    </ModalDialog>
  );
};

export default SendLetterModal;
