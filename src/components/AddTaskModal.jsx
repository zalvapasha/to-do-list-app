import React, { useRef, useState } from "react";
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

import useAddTask from "@/hooks/useAddTask";
import { generateId } from "@/utils/generateID";
import { getCurrentDate } from "@/utils/getCurrentDate";

export function AddTaskModal({ toggleModal }) {
  const taskNameRef = useRef(null);
  const taskDescriptionRef = useRef(null);
  const taskDateRef = useRef(null);
  const [date, setDate] = useState(null);

  const { addTask } = useAddTask();

  const validateTaskInput = () => {
    const taskName = taskNameRef.current.value;
    const taskDescription = taskDescriptionRef.current.value;
    const taskDate = taskDateRef.current.value;

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
    const task = {
      id: generateId(),
      name: taskNameRef.current.value,
      description: taskDescriptionRef?.current?.value || "No description",
      createdAt: getCurrentDate(),
      dueDate: taskDateRef.current.value,
      status: "Aktif",
    };
    window.confirm("Are you sure you want to add this task?") && addTask(task);
  };

  return (
    <div className="inset-0 fixed flex items-center justify-center backdrop-blur-sm">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
            <CardDescription>
              Add your Task for your daily routine.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    ref={taskNameRef}
                    id="taskName"
                    placeholder="Name of your task"
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
                  <input
                    type="hidden"
                    ref={taskDateRef}
                    value={date ? format(date, "yyyy-MM-dd") : ""}
                  />
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

AddTaskModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
