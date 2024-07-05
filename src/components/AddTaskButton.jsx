import { useState } from "react";
import { Plus } from "lucide-react";

import { AddTaskModal } from "./AddTaskModal";
import { Button } from "@/components/ui/button";

export const AddTaskButton = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button variant="outline" size="icon" onClick={toggleModal}>
        <Plus />
      </Button>
      {showModal && <AddTaskModal toggleModal={toggleModal} />}
    </div>
  );
};
