import { useEffect, useState } from "react";
import ModalDialog from "./ModalDialog";

const ScannerHistory = ({
  isOpen,
  setIsOpen,
  selectedResult,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedResult: any;
}) => {
  const [recipients, setRecipients] = useState<string[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (selectedResult?.sendTo?.length > 0) {
      const fetchRecipients = async () => {
        try {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/user/get-usersByIds?ids=${selectedResult.sendTo.join(",")}`
          );
          const data = await response.json();
          if (data?.status === "success" && data?.data?.users) {
            const recipientNames = data.data.users.map(
              (user: any) => user.name
            );
            setRecipients(recipientNames);
          } else {
            setRecipients(["Error fetching recipients"]);
          }
        } catch (error) {
          setRecipients(["Error fetching recipients"]);
        }
      };

      fetchRecipients();
    }
  }, [selectedResult]);

  return (
    <ModalDialog
      isOpen={isOpen}
      title="Letter History"
      description="View details of the letter"
      onClose={() => setIsOpen(false)}
    >
      {selectedResult ? (
        <div className="space-y-1">
          <p className="text-dark-secondary">
            <span className="text-dark-primary font-medium">Subject:</span>{" "}
            {selectedResult.subject}
          </p>
          <p className="text-dark-secondary">
            <span className="text-dark-primary font-medium">Reference:</span>{" "}
            {selectedResult.reference}
          </p>
          <p className="text-dark-secondary">
            <span className="text-dark-primary font-medium">Send By:</span>{" "}
            {selectedResult.sendBy}
          </p>
          <p className="text-dark-secondary">
            <span className="text-dark-primary font-medium">Send To:</span>{" "}
            {recipients.length > 0 ? (
              recipients.join(", ")
            ) : (
              <span>No recipients</span>
            )}
          </p>
          <p className="text-dark-secondary">
            <span className="text-dark-primary font-medium">Created At:</span>{" "}
            {formatDate(selectedResult.createdAt)}
          </p>
        </div>
      ) : (
        <p>No result selected</p>
      )}
    </ModalDialog>
  );
};

export default ScannerHistory;
