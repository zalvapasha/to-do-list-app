import { useState } from "react";
import PropTypes from "prop-types";

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
import { getRemainingDay } from "@/utils/getRemainingDay";
import useDeleteTask from "@/hooks/useDeleteTask";
import useCompleteTask from "@/hooks/useCompleteTask";
import useDeleteCompleteTask from "@/hooks/useDeleteCompleteTask";

export const TaskCard = ({ taskData, taskType }) => {
  const [toggleUpdateModal, setToggleUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { deleteTask } = useDeleteTask();

  const { addCompleteTask } = useCompleteTask();

  const { deleteCompleteTask } = useDeleteCompleteTask();

  const handleCompleteClick = (task) => {
    window.confirm("Are you sure you want to complete this task?") &&
      addCompleteTask(task);
    console.log("complete");
  };

  const handleEditClick = (task) => {
    setToggleUpdateModal(!toggleUpdateModal);
    setSelectedTask(task);
  };

  /**
   * Handles the deletion of a task.
   * @param {string} taskID - ID of the task.
   * @param {string} status - Status of the task.
   */
  const handleDeleteClick = (taskID, status) => {
    if (status === "Complete") {
      deleteCompleteTask(taskID);
    } else if (status === "Aktif") {
      deleteTask(taskID);
    } else {
      alert("Something went wrong while deleting the task.");
    }
  };

  const getBadgeColor = (taskType) => {
    switch (taskType) {
      case "Today":
        return "bg-amber-500";
      case "Upcoming":
        return "bg-blue-500";
      case "Due":
        return "bg-red-500";
      case "Complete":
        return "bg-emerald-500";
      default:
        return "bg-amber-500";
    }
  };

  return (
    <>
      <Card className="h-fit">
        <CardHeader>
          <div className="flex items-center gap-2">
            {/* Task type and badge */}
            <div
              className={`${getBadgeColor(
                taskType
              )} border-2 rounded-md w-6 h-6 aspect-square border-stroke`}
            ></div>
            <h1 className="font-semibold">{taskType}</h1>
          </div>
        </CardHeader>
        <CardContent>
          {/* Task Accordion */}
          <Accordion type="single" collapsible>
            {/* Accordion Item */}
            {taskData.map((task) => (
              <AccordionItem value={task.id} key={task.id}>
                <div className="flex items-center justify-between cursor-pointer">
                  <AccordionTrigger>{task.name}</AccordionTrigger>
                  <div>
                    {task.status === "Aktif" && (
                      <>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleCompleteClick(task)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditClick(task)}
                        >
                          <SquarePen className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDeleteClick(task.id, task.status)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <AccordionContent>
                  <p className="mb-2">{task.description}</p>
                  <table className="text-sm">
                    <tbody>
                      <tr>
                        <td className="pr-2">Created at</td>
                        <td>: {task.createdAt}</td>
                      </tr>
                      <tr>
                        <td className="pr-2">Due at</td>
                        <td>: {task.dueDate}</td>
                      </tr>
                      <tr>
                        <td className="pr-2">Remaining days</td>
                        <td>: {getRemainingDay(task.dueDate)}</td>
                      </tr>

                      {task.status === "Complete" && (
                        <tr>
                          <td className="pr-2">Completed at</td>
                          <td>: ini selesai </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {toggleUpdateModal && (
        <UpdateTaskModal task={selectedTask} toggleModal={handleEditClick} />
      )}
    </>
  );
};

TaskCard.propTypes = {
  taskData: PropTypes.array.isRequired,
  taskType: PropTypes.string.isRequired,
};
