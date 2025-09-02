import { cn } from "@/lib/utils";

export default function FullContainer({ children, className, style, id }) {
  return (
    <div
      id={id}
      style={style}
      className={cn(
        "w-full flex items-center justify-center flex-col bg-cover bg-center relative",
        className
      )}
    >
      {children}
    </div>
  );
}
