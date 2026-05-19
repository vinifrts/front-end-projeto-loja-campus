/**
 * botao reutilizável com variantes.
 * variant: "primary" | "secondary" | "outline" | "danger" | "success"
 */
export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) {
  const base =
    "font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-900 hover:bg-blue-700 text-white py-3 px-6",
    secondary: "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-6",
    outline: "border border-blue-400 text-white hover:bg-blue-800 py-3 px-6",
    danger: "bg-red-500 hover:bg-red-600 text-white py-2 px-4",
    success: "bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}