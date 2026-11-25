import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  href: string;
  variant?: "solid" | "outline";
  /** Opens in a new tab with safe rel attributes */
  external?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

const base =
  "group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.97]";

const variants = {
  solid: "bg-ink text-surface hover:bg-ink/85",
  outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
} as const;

/** Pill-shaped link button. Always renders an <a> — every button on this site navigates. */
export function Button({
  href,
  variant = "solid",
  external = false,
  icon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {icon && (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          {icon}
        </span>
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
