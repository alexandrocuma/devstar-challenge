import { useDraggable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Move, Pencil, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_TASK, GET_TASKS, UPDATE_TASK } from "@/queries/task";

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
import { useForm } from "react-hook-form";

export const TaskCard = ({
  task,
}: {
  task: {
    id: string;
    title: string;
    description: string;
  };
}) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const [updateTask, { loading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
    onCompleted: () => {
      form.reset();
      setOpenEdit(false);
    },
  });

  const form = useForm<{
    id: string;
    title: string;
    description: string;
  }>({
    values: {
      id: task.id,
      title: task.title,
      description: task.description,
    },
  });

  const onSubmit = form.handleSubmit((params) => {
    updateTask({ variables: params });
  });

  return (
    <Card ref={setNodeRef} style={style} className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {task.title}
          <Button
            variant="ghost"
            className="cursor-pointer"
            {...listeners}
            {...attributes}
          >
            <Move />
          </Button>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-end gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete task</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {task.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteTask({ variables: { id: task.id } });
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogTrigger asChild>
            <Button>
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete task</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {task.title}
              </DialogDescription>
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
                    onClick={() => setOpenEdit(false)}
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
      </CardFooter>
    </Card>
  );
};
