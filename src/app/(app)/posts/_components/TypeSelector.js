const TypeSelector = ({ selectedType, onChange }) => {
    return (
        <div className="text-black w-full">
            <select
                className="text-black mt-2 p-1 border rounded leading-tight w-full block appearance-none bg-white prounded focus:outline-none focus:shadow-outline"
                value={selectedType}
                onChange={onChange}>
                <option value="REQUEST">Request</option>
                <option value="FOUND">Found</option>
            </select>
        </div>
    )
}

export default TypeSelector
