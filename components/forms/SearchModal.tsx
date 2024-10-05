import CustomButton, { ButtonVariant } from "../CustomButton";
import ModalDialog from "../ModalDialog";
import { PlusCircle } from "lucide-react";
import SearchForm from "./SearchForm";

const SearchModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <ModalDialog
      isOpen={isOpen}
      title="Select Attachments"
      description="Please select attachments to send"
      onClose={() => setIsOpen(false)}
    >
      <SearchForm className="w-4/6" />
      <CustomButton
        variant={ButtonVariant.DEFAULT}
        text={"Select"}
        className="w-full"
        iconSrc={PlusCircle}
      />
    </ModalDialog>
  );
};

export default SearchModal;
