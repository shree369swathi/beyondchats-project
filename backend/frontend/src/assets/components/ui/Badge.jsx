import clsx from "clsx";

export function Badge({ children, variant }) {
  return (
    <span
      className={clsx(
        "text-xs px-2 py-1 rounded-full font-medium",
        variant === "updated"
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      )}
    >
      {children}
    </span>
  );
}
