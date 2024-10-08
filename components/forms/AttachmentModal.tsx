import CustomButton, { ButtonVariant } from "../CustomButton";
import ModalDialog from "../ModalDialog";
import { PlusCircle } from "lucide-react";
import SearchAttachment from "./SearchAttachment";

const AttachmentModal = ({
  isOpen,
  setIsOpen,
  onAttachmentSelected,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAttachmentSelected: (fileLocation: string) => void;
}) => {
  return (
    <ModalDialog
      isOpen={isOpen}
      title="Add Attachment"
      description="Select an attachment to include with the letter"
      onClose={() => setIsOpen(false)}
    >
      <SearchAttachment onAttachmentSelected={onAttachmentSelected} />
      <CustomButton
        variant={ButtonVariant.DEFAULT}
        text="Select"
        className="w-full"
        iconSrc={PlusCircle}
        onClick={() => setIsOpen(false)}
      />
    </ModalDialog>
  );
};

export default AttachmentModal;
