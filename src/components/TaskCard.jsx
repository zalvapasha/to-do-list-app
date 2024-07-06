import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen, Check } from "lucide-react";

import { UpdateTaskModal } from "./UpdateTaskModal";

export const TaskCard = () => {
  const [toggleUpdateModal, setToggleUpdateModal] = useState(false);

  const handleCompleteClick = () => {
    console.log("complete");
  };

  const handleEditClick = () => {
    setToggleUpdateModal(!toggleUpdateModal);
  };

  const handleTrashClick = () => {
    console.log("delete");
  };

  return (
    <>
      <Card className="h-fit">
        <CardHeader>
          <div className="flex items-center gap-2">
            {/* Task type and badge */}
            <div className="border-2 rounded-md w-6 h-6 bg-amber-500 aspect-square border-stroke"></div>
            <h1 className="font-semibold">Card</h1>
          </div>
        </CardHeader>
        <CardContent>
          {/* Task Accordion */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <div className="flex items-center justify-between cursor-pointer">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <div>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={handleCompleteClick}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={handleEditClick}
                  >
                    <SquarePen className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={handleTrashClick}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <AccordionContent>
                <p className="mb-2">dummy description</p>
                <table className="text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-2">Created at</td>
                      <td>: dummy created</td>
                    </tr>
                    <tr>
                      <td className="pr-2">Due at</td>
                      <td>: dummy due</td>
                    </tr>

                    <tr>
                      <td className="pr-2">Completed at</td>
                      <td>: dummy completed</td>
                    </tr>
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {toggleUpdateModal && <UpdateTaskModal toggleModal={handleEditClick} />}
    </>
  );
};
