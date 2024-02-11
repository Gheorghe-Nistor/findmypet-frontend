const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} text-black border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm`}
        {...props}
    />
)

export default Input
