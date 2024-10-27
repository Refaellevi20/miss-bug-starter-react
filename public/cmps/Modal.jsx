const { useState } = React
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function CarModal({ bugPrice, onClose }) {
    const [money, setMoney] = useState(250)

    const handlePurchase = () => {
        if (money < bugPrice) {
            showErrorMsg('You do not have enough money to buy this car!')
            return
        }
        const newMoney = money - bugPrice
        setMoney(newMoney)
        localStorage.setItem('money', newMoney)
        showSuccessMsg(`You updated your bank. Remaining money: $${newMoney.toFixed(2)}`)
        onClose()
    }

    return (
        <div className="modal">
            <h2>Buy Car</h2>
            <p>Price: ${bugPrice.toFixed(2)}</p>
            <p>Your Money: ${money.toFixed(2)}</p>
            <button onClick={handlePurchase}>Purchase</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

