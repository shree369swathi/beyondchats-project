import clsx from "clsx";

export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-md bg-brand text-white hover:opacity-90 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
