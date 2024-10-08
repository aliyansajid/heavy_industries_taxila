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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Employee = {
  id: string;
  name: string;
};

type Department = {
  id: string;
  name: string;
  employees: Employee[];
};

const SendLetterModal = ({
  isOpen,
  setIsOpen,
  letterId,
  subject,
  reference,
  uploadedBy,
  actionType,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  letterId: string;
  subject?: string;
  reference?: string;
  uploadedBy?: string;
  actionType: "create" | "forward";
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = sendLetterSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departmentSelected, setDepartmentSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchDepartments = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/get-departments`
          );
          const data = await response.json();
          setDepartments(data.departments);
        } catch (error) {
          console.error("Error fetching departments:", error);
          toast({
            description: "There was an error fetching the departments.",
            variant: "destructive",
          });
        }
      };
      fetchDepartments();
    }
  }, [isOpen]);

  const handleDepartmentChange = (selectedDepartmentName: string) => {
    const department = departments.find(
      (dept: Department) => dept.name === selectedDepartmentName
    );
    if (department) {
      setEmployees(department.employees);
      setSelectedDepartment(department);
      setDepartmentSelected(true);
    } else {
      setEmployees([]);
      setSelectedDepartment(null);
      setDepartmentSelected(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const selectedEmployeeId = values.employees[0];
      let response: Response | undefined = undefined;

      if (actionType === "create") {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scanner/create-scanner`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              letterId,
              departmentId: selectedDepartment?.id,
              sendTo: values.employees,
              sendBy: uploadedBy,
              subject,
              reference,
            }),
          }
        );
      } else if (actionType === "forward") {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/letters/forward-letter`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              letterId,
              fromUserId: uploadedBy,
              toUserId: selectedEmployeeId,
            }),
          }
        );
      }

      if (response?.ok) {
        setIsOpen(false);
        toast({
          description:
            actionType === "create"
              ? "Letter sent successfully."
              : "Letter forwarded successfully.",
          variant: "default",
        });
        router.push("/inbox");
      } else if (response) {
        const result = await response.json();
        toast({
          description:
            result.error || "There was an error processing the letter.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error processing letter:", error);
      toast({
        description: "There was an error processing the letter.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalDialog
      isOpen={isOpen}
      title={actionType === "create" ? "Send Letter" : "Forward Letter"}
      description="Select the department and employees"
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
            text={actionType === "create" ? "Send" : "Forward"}
            className="w-full"
            iconSrc={Send}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </form>
      </Form>
    </ModalDialog>
  );
};

export default SendLetterModal;
