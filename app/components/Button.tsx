/**
 * ボタンコンポーネント
 */
interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({
  onClick,
  children,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "rounded-full border border-solid transition-colors flex items-center justify-center font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5";

  const variantClasses = {
    primary:
      "bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] border-transparent",
    secondary:
      "bg-transparent text-foreground gap-2 hover:bg-black/[.05] dark:hover:bg-white/[.06] border-black/10 dark:border-white/10",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
