"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateDraftForm from "./forms/CreateDraftForm";

const LetterTabs = ({ letter }: { letter: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tabs defaultValue="letter" className="w-full p-8">
      <TabsList>
        <TabsTrigger value="letter">Letter</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
      </TabsList>

      <TabsContent value="letter">
        <div className="pt-4 flex items-center justify-center">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${letter.fileLocation}`}
            alt="Letter image"
            className="max-h-full max-w-full"
          />
        </div>
      </TabsContent>

      <TabsContent value="draft">
        <div className="pt-4">
          <Button variant={"default"} onClick={() => setIsOpen(true)}>
            Add Draft
          </Button>
        </div>
      </TabsContent>

      {isOpen && (
        <CreateDraftForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          letterId={letter.id}
        />
      )}
    </Tabs>
  );
};

export default LetterTabs;
