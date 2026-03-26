

/**
 * A reusable button component with customizable styles based on buttonType.
 * @param {string} buttonType - The type of button, either "primary" or other for different styles.
 * @param {function} onClick - The click handler function.
 * @param {React.ReactNode} children - The content to display inside the button.
 */

export function Button({buttonType, onClick, children}) {
    const buttonStyle = buttonType === "primary" ? "bg-green-400" : "bg-green-100" + " border";

    return <button className={buttonStyle} onClick={onClick}>{children}</button>
}