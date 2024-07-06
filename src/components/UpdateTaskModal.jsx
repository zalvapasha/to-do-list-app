import React, { useState } from "react";
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

export function UpdateTaskModal({ toggleModal }) {
  const [date, setDate] = useState(null);
  return (
    <div className="inset-0 fixed flex items-center justify-center">
      <Card className="w-[350px]">
        <form>
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

UpdateTaskModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
