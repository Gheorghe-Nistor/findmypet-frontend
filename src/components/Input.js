const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} text-black bg-white mt-2 p-1 border rounded leading-tight w-full block appearance-none prounded focus:outline-none focus:shadow-outline`}
        {...props}
    />
)

export default Input
