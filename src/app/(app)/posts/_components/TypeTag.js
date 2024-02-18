import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'

const TypeTag = ({ type }) => {
    const isFound = type.toLowerCase() === 'found'

    return (
        <div
            className={`inline-flex items-center px-2 py-2 rounded-xl font-bold text-white ${
                isFound ? 'bg-green-500' : 'bg-orange-500'
            } gap-2`}>
            <FontAwesomeIcon icon={isFound ? faHandHoldingHeart : faSearch} />{' '}
            {isFound ? 'Found' : 'Request'}
        </div>
    )
}

export default TypeTag
