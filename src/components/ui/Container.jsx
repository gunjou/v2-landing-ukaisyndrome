import { cn } from "./cn";

export default function Container({ className, children, ...props }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8 2xl:max-w-7xl", className)} {...props}>
      {children}
    </div>
  );
}
