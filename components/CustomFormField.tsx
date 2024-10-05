import Image from "next/image";
import { Control } from "react-hook-form";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MultiSelect } from "./MultiSelect";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  MULTI_SELECT = "multiSelect",
  SKELETON = "skeleton",
}

interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  children?: React.ReactNode;
  readOnly?: boolean;
  className?: string;
  type?: string;
  options?: Option[];
  renderSkeleton?: (field: any) => React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const [date, setDate] = React.useState<Date>();
  const {
    fieldType,
    type,
    placeholder,
    name,
    onKeyDown,
    onChange,
    readOnly,
    className,
    options,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="relative">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={20}
              width={20}
              alt={props.iconAlt || "icon"}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              readOnly={readOnly}
              className={`${props.iconSrc ? "pl-10" : ""} ${className}`}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              onKeyDown={onKeyDown}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className={className}>{props.children}</SelectContent>
        </Select>
      );

    case FormFieldType.MULTI_SELECT:
      return (
        <MultiSelect
          options={options || []}
          onValueChange={field.onChange}
          defaultValue={field.value}
          placeholder={placeholder}
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea placeholder={placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal border-interaction-outline-base hover:bg-white hover:border-interaction-outline-hover",
                  className,
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2" size={16} />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, disabled } = props;
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
