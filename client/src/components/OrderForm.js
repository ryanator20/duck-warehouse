import { useState } from 'react'
import { Sizes, Colors, ShippingModes, Countries } from '../constants'
import './Form.css'

function OrderForm({ submitOrder, closeForm }) {
    // takes size, color, quantity, country, shippingMode
    // returns packageType, protectionType, cost, details
    const [color, setColor] = useState(Colors[0])
    const [size, setSize] = useState(Sizes[0])
    const [quantity, setQuantity] = useState(0)
    const [country, setCountry] = useState(Countries[0])
    const [shippingMode, setShippingMode] = useState(ShippingModes[0])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        submitOrder({ color, size, quantity, country, shippingMode })
        closeForm()
    }

    return (
        <form className='Form' onSubmit={handleSubmit}>
            <div className='input-group'>
                <label for='color'>Color:</label>
                <select id='color' value={color} onChange={event => setColor(event.target.value)}>
                    {Colors.map(color => <option key={color} value={color}>{color}</option>)}
                </select>
            </div>
            <div className='input-group'>
                <label for='size'>Size:</label>
                <select value={size} onChange={event => setSize(event.target.value)}>
                    {Sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
            </div>
            <div className='input-group'>
                <label for='quantity'>Quantity:</label>
                <input id='quantity' type='text' value={quantity} onChange={event => setQuantity(event.target.value)} />
            </div>
            <div className='input-group'>
                <label for='country'>Country:</label>
                <select value={country} onChange={event => setCountry(event.target.value)}>
                    {Countries.map(country => <option key={country} value={country}>{country}</option>)}
                </select>
            </div>
            <div className='input-group'>
                <label for='shippingMode'>Shipping Mode:</label>
                <select value={shippingMode} onChange={event => setShippingMode(event.target.value)}>
                    {ShippingModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                </select>
            </div>
            <div className='input-group'>
                <button type="button" onClick={closeForm}>Cancel</button>
                <button type="submit">Submit Order</button>
            </div>
        </form>
    )
}

export default OrderForm