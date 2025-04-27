import { useDroppable } from "@dnd-kit/core";

export const Column = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      className="flex flex-col rounded-2xl p-4 gap-4 bg-zinc-400/20 min-h-[700px]"
      ref={setNodeRef}
    >
      <h3 className="text-2xl text-center font-bold my-8">{title}</h3>
      {children}
    </div>
  );
};
