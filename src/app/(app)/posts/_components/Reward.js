import { FaMoneyBillWave, FaCoins } from 'react-icons/fa'

const Reward = ({ value }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaCoins style={{ color: 'gold' }} />
            <span>Reward: {value} RON</span>
        </div>
    )
}

export default Reward
