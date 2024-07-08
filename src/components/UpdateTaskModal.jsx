import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import useUpdateTask from "@/hooks/useUpdateTask";
import { getCurrentDate } from "@/utils/getCurrentDate";

/**
 * Component for updating a task.
 * @param {Object} task - The task to be updated.
 * @param {Function} toggleModal - Function to toggle the visibility of the modal.
 * @returns {JSX.Element} UpdateTaskModal component.
 */
export function UpdateTaskModal({ task, toggleModal }) {
  const [date, setDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null
  );

  const taskNameRef = useRef();
  const taskDescriptionRef = useRef();

  const { updateTask } = useUpdateTask();

  const validateTaskInput = () => {
    const taskName = taskNameRef.current.value;
    const taskDescription = taskDescriptionRef.current.value;
    const taskDate = date ? format(date, "yyyy-MM-dd") : null;

    if (!taskName || !taskDescription || !taskDate) {
      return "All fields are required!";
    }

    const currentDate = new Date(getCurrentDate());
    const selectedDate = new Date(taskDate);

    if (selectedDate < currentDate) {
      return "Date cannot be in the past";
    }
    if (taskName.length > 20) {
      return "Name cannot be longer than 20 characters";
    }
    if (taskDescription.length > 100) {
      return "Description cannot be longer than 100 characters";
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(taskDate)) {
      return "Invalid date format!";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateTaskInput();

    if (validationError) {
      alert(validationError);
      return;
    }

    const updatedTask = {
      id: task.id,
      name: taskNameRef.current.value,
      description: taskDescriptionRef.current.value,
      dueDate: format(date, "yyyy-MM-dd"),
    };

    window.confirm("Are you sure you want to update this task?") &&
      updateTask(task.id, updatedTask);

    toggleModal();
  };

  return (
    <div className="inset-0 fixed flex items-center justify-center backdrop-blur-sm">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
            <CardDescription>Update your task details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="taskName"
                    placeholder="Name of your task"
                    ref={taskNameRef}
                    defaultValue={task.name}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    placeholder="Type your description here."
                    className="max-h-40"
                    name="taskDescription"
                    id="taskDescription"
                    ref={taskDescriptionRef}
                    defaultValue={task.description}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={toggleModal}>
              Cancel
            </Button>
            <Button type="submit" title="add task">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

UpdateTaskModal.propTypes = {
  task: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
