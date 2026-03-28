/**
 * A reusable button component with customizable styles.
 */

// 1. Define the Interface
interface ButtonProps {
  buttonType?: "primary" | "secondary";
  onClick?: () => void;
  children: React.ReactNode;
}

// 2. Apply the Interface to the function
export function Button({ buttonType, onClick, children }: ButtonProps) {
  const buttonStyle =
    buttonType === "primary"
      ? "bg-button-primary text-white border-button-primary"
      : "bg-button-secondary text-gray-600 border-white";

  return (
    <button
      className={`${buttonStyle} rounded-full py-1 px-4 
                  border-4 cursor-pointer transition-all duration-300
                  hover:bg-white hover:text-black hover:border-button-primary`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}