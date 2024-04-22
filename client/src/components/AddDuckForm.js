import React, { useState } from 'react'
import './Form.css'
import { Colors, Sizes } from '../constants'

function AddDuckForm({ submitDuck, currentDuck, closeForm }) {
    const [color, setColor] = useState(currentDuck?.color || Colors[0])
    const [size, setSize] = useState(currentDuck?.size || Sizes[0])
    const [price, setPrice] = useState(currentDuck?.price || 0)
    const [quantity, setQuantity] = useState(currentDuck?.quantity || 0)

    const editing = !!currentDuck

    const handleSubmit = (event) => {
        event.preventDefault()
        submitDuck(color, size, price, quantity)
        closeForm()
    }

    return (
        <form className='Form' onSubmit={handleSubmit}>
            <div className='input-group'>
                <label for='color'>Color:</label>
                <select id='color' disabled={editing} value={color} onChange={event => setColor(event.target.value)}>
                    {editing ? <option value={color}>{color}</option> : Colors.map(color => <option key={color} value={color}>{color}</option>)}
                </select>
            </div>
            <div className='input-group'>
                <label for='size'>Size:</label>
                <select disabled={editing} value={size} onChange={event => setSize(event.target.value)}>
                    {editing ? <option value={size}>{size}</option> : Sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
            </div>
            <div className='input-group'>
                <label for='price'>Price:</label>
                <input id='price' type='text' value={price} onChange={event => setPrice(event.target.value)} />
            </div>
            <div className='input-group'>
                <label for='quantity'>Quantity:</label>
                <input id='quantity' type='text' value={quantity} onChange={event => setQuantity(event.target.value)} />
            </div>
            <div className='input-group'>
                <button type="button" onClick={closeForm}>Cancel</button>
                <button type="submit">{editing ? 'Submit Changes': 'Add Duck'}</button>
            </div>
        </form>
    )
}

export default AddDuckForm