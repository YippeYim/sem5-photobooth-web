

/**
 * A reusable button component with customizable styles based on buttonType.
 * @param {string} buttonType - The type of button, either "primary" or other for different styles.
 * @param {function} onClick - The click handler function.
 * @param {React.ReactNode} children - The content to display inside the button.
 */

export function Button({buttonType, onClick, children}) {
    const buttonStyle = buttonType === "primary" ? 
    "bg-button-primary text-white border-button-primary" :
    "bg-button-secondary text-gray-600 border-white" ;

    return (
          <button 
            className={`${buttonStyle} rounded-full py-1 px-2.5 
                  border-4   
                        cursor-pointer transition-all duration-300
                              hover:bg-white hover:text-black hover:border-button-primary`} 
            onClick={onClick}
          >
            {children}
          </button>
    );
}