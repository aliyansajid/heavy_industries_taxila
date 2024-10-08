"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import CreateDraftForm from "./forms/CreateDraftForm";
import { useToast } from "@/hooks/use-toast";
import { buttonVariants } from "@/components/ui/button";
import { Download, Files, FileText, Forward } from "lucide-react";
import CustomButton, { ButtonVariant } from "./CustomButton";
import SendLetterModal from "./forms/SendLetterModal";

const LetterTabs = ({ letter }: { letter: any }) => {
  const { toast } = useToast();
  const [isDraftFormOpen, setIsDraftFormOpen] = useState(false);
  const [isSendLetterModalOpen, setIsSendLetterModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const draftIds = letter.drafts;

        const draftResponses = await Promise.all(
          draftIds.map(async (draftId: string) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/draft/get-draft/${draftId}`
            );
            const result = await response.json();
            if (!response.ok) {
              toast({
                description: result.error,
                variant: "destructive",
              });
            }
            return result;
          })
        );

        setDrafts(draftResponses);
      } catch (error: any) {
        toast({
          description: "There was an error fetching the drafts.",
          variant: "destructive",
        });
      }
    };

    if (letter.drafts.length > 0) {
      fetchDrafts();
    }
  }, [letter.drafts]);

  return (
    <Tabs defaultValue="letter" className="w-full p-8">
      <TabsList>
        <TabsTrigger value="letter">Letter</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
      </TabsList>

      <TabsContent value="letter">
        <div className="mt-5 flex flex-col gap-5 items-center justify-between h-full">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${letter.fileLocation}`}
            alt="Letter image"
            className="max-h-full max-w-full"
          />
          <div className="flex justify-end items-end w-full">
            <CustomButton
              variant={ButtonVariant.DEFAULT}
              text="Forward"
              iconSrc={Forward}
              onClick={() => setIsSendLetterModalOpen(true)} // Open SendLetterModal
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="draft">
        <div className="mt-5">
          <Button variant={"default"} onClick={() => setIsDraftFormOpen(true)}>
            <FileText size={20} />
            Add Draft
          </Button>

          <div className="mt-5">
            {drafts.length > 0 ? (
              drafts.map((draft) => (
                <div
                  key={draft._id}
                  className="border p-4 mb-4 rounded flex justify-between items-center"
                >
                  <div className="text-left space-y-1">
                    <p className="text-dark-secondary">
                      <span className="text-dark-primary font-medium">
                        Draft:
                      </span>{" "}
                      {draft.draft}
                    </p>
                    <p className="text-dark-secondary">
                      <span className="text-dark-primary font-medium">
                        Subject:
                      </span>{" "}
                      {draft.subject}
                    </p>
                    <p className="text-dark-secondary">
                      <span className="text-dark-primary font-medium">
                        Created By:
                      </span>{" "}
                      {draft.createdBy}
                    </p>
                    <p className="text-dark-secondary">
                      <span className="text-dark-primary font-medium">
                        Created At:
                      </span>{" "}
                      {new Date(draft.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col text-right space-y-2">
                    <a
                      download
                      href={`${
                        process.env.NEXT_PUBLIC_BACKEND_URL
                      }/download/${encodeURIComponent(
                        draft.attachment.replace(/^\/?uploads[\\/]/, "")
                      )}`}
                      className={buttonVariants({ variant: "default" })}
                    >
                      <Files size={20} />
                      Attachment
                    </a>
                    <a
                      download
                      href={`${
                        process.env.NEXT_PUBLIC_BACKEND_URL
                      }/download/${encodeURIComponent(
                        draft.filePath.replace(/^\/?uploads[\\/]/, "")
                      )}`}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <Download size={20} />
                      Download
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No drafts available.</p>
            )}
          </div>
        </div>
      </TabsContent>

      {isDraftFormOpen && (
        <CreateDraftForm
          isOpen={isDraftFormOpen}
          setIsOpen={setIsDraftFormOpen}
          letterId={letter.id}
        />
      )}
      {isSendLetterModalOpen && (
        <SendLetterModal
          isOpen={isSendLetterModalOpen}
          setIsOpen={setIsSendLetterModalOpen}
          letterId={letter.id}
          actionType="forward"
        />
      )}
    </Tabs>
  );
};

export default LetterTabs;
