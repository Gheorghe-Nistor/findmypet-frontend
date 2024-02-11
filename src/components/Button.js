const Button = ({ type = 'submit', className, isFlex, ...props }) => (
    <button
        type={type}
        className={`${className} ${
            !isFlex ? 'inline-flex' : ''
        } items-center px-4 py-2 bg-blue-900  hover:bg-blue-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 focus:outline-none focus:border-gray-700 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button
