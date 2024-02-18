import FlexCenterWrapper from './FlexCenterWrapper'

const LabeledFlexWrapper = ({ label, labelFor, children, ...props }) => {
    return (
        <FlexCenterWrapper {...props}>
            <label
                htmlFor={labelFor}
                className="block text-lg font-medium text-white">
                {label}
            </label>
            {children}
        </FlexCenterWrapper>
    )
}

export default LabeledFlexWrapper
