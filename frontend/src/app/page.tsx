"use client";

import { useQuery, useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TaskCard } from "@/components/task-card";
import { Column } from "@/components/column";
import { useState } from "react";
import { Loader2, Move, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CREATE_TASK, GET_TASKS, UPDATE_TASK } from "@/queries/task";
import { TaskType } from "@/interfaces/task";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(GET_TASKS);

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
    onCompleted: () => {
      form.reset();
      setOpen(false);
    },
  });

  const [updateTask, { loading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const handleDrag = (event: DragEndEvent) => {
    const { active, collisions } = event;

    if (active.id && collisions) {
      updateTask({
        variables: {
          id: active.id,
          step: collisions![0].id,
        },
      });
    }
  };

  const form = useForm<{
    title: string;
    description: string;
  }>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = form.handleSubmit((params) => {
    createTask({ variables: params });
  });

  const DragDropComponent = () => {
    return (
      <div className="flex h-full flex-col gap-4 items-center justify-center border bg-zinc-500/10 border-zinc-500/20 rounded-2xl p-10">
        <Move />
        Drag and drop here
      </div>
    );
  };

  return (
    <div className="p-6 min-h-full">
      <div className="flex items-center justify-between my-6">
        <h3 className="text-3xl font-semibold">
          DevStar Challenge Kanban / Trello Board
        </h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> New task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create new task</DialogTitle>
              <DialogDescription>Add the information</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form method="POST" onSubmit={onSubmit}>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Type here..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Title for your new task
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Type here..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Description for your new task
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    disabled={loading}
                    variant="outline"
                    className="mt-8"
                    onClick={() => setOpen(false)}
                    type="reset"
                  >
                    Close
                  </Button>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="mt-8"
                    onClick={onSubmit}
                  >
                    {loading && <Loader2 className="animate-spin" />}
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <DndContext onDragEnd={handleDrag}>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Column id="PENDING" title="Pending Task">
            {data?.tasks.filter((task: TaskType) => task.step === "PENDING")
              .length > 0 ? (
              data?.tasks
                .filter((task: TaskType) => task.step === "PENDING")
                .map((task: TaskType) => <TaskCard key={task.id} task={task} />)
            ) : (
              <DragDropComponent />
            )}
          </Column>
          <Column id="IN_PROGRESS" title="In Progress">
            {data?.tasks.filter((task: TaskType) => task.step === "IN_PROGRESS")
              .length > 0 ? (
              data?.tasks
                .filter((task: TaskType) => task.step === "IN_PROGRESS")
                .map((task: TaskType) => <TaskCard key={task.id} task={task} />)
            ) : (
              <DragDropComponent />
            )}
          </Column>
          <Column id="COMPLETED" title="Completed">
            {data?.tasks.filter((task: TaskType) => task.step === "COMPLETED")
              .length > 0 ? (
              data?.tasks
                .filter((task: TaskType) => task.step === "COMPLETED")
                .map((task: TaskType) => <TaskCard key={task.id} task={task} />)
            ) : (
              <DragDropComponent />
            )}
          </Column>
        </div>
      </DndContext>
    </div>
  );
}
