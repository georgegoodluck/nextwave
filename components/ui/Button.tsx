export const Button = ({ variant = "primary", children, ...props }) => {
  const styles = {
    primary: "bg-[#B08D21] text-white hover:bg-[#8e711a]",
    secondary: "bg-[#1A1A1A] text-white hover:bg-black",
    outline:
      "border-2 border-[#B08D21] text-[#B08D21] hover:bg-[#B08D21] hover:text-white",
  };

  return (
    <button
      className={`px-8 py-3 rounded-full font-bold transition-all active:scale-95 ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
