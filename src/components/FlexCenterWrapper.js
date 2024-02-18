const FlexCenterWrapper = ({
    children,
    className,
    width = 'w-full',
    ...props
}) => {
    const combinedClassName = `flex flex-1 flex-col justify-center items-center ${width} ${
        className || ''
    }`

    return (
        <div className={combinedClassName} {...props}>
            {children}
        </div>
    )
}

export default FlexCenterWrapper
