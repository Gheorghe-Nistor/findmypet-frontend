const DisplayContent = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default DisplayContent
