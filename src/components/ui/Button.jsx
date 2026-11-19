import { Link } from "react-router";
import { cn } from "./cn";

const variants = {
  primary: "bg-accent text-ink hover:bg-accent-hover",
  brand: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line text-fg hover:bg-fg/5",
  ghost: "text-fg-muted hover:bg-fg/5 hover:text-fg",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

// `to` → link internal, `href` → link eksternal, selain itu <button>.
export default function Button({ variant = "primary", size = "md", to, href, className, children, ...props }) {
  const classes = cn(
    "group inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap",
    "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <button type="button" className={classes} {...props}>{children}</button>;
}
