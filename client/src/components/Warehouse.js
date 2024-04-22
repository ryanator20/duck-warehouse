import React, { useState, useEffect, useCallback } from 'react'
import AddDuckForm from './AddDuckForm'
import OrderForm from './OrderForm'
import './Warehouse.css'
import { apiURL } from '../constants'

function Warehouse() {
    const [ducks, setDucks] = useState([])
    const [addDuckFormOpen, setAddDuckFormOpen] = useState(false)
    const [currentDuck, setCurrentDuck] = useState(undefined)
    const [orderFormOpen, setOrderFormOpen] = useState(false)

    const getDucks = useCallback(async () => {
        const response = await fetch(`${apiURL}/ducks`)
        const data = await response.json()
        setDucks(data)
    }, [setDucks])
    
    useEffect(() => {
        getDucks()
    }, [getDucks])
    

    const addDuck = async (color = 'Yellow', size = 'Large', price = 10, quantity = 1) => {
        await fetch(`${apiURL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ color, size, price, quantity})
        })
        getDucks()
    }

    const editDuck = async (color, size, price, quantity) => {
        await fetch(`${apiURL}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ color, size, price, quantity})
        })
        getDucks()
    }

    const deleteDuck = async (color, size) => {
        await fetch(`${apiURL}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ color, size })
        })
        getDucks()
    }

    const openAddDuckForm = (currentDuck) => {
        setCurrentDuck(currentDuck)
        setAddDuckFormOpen(true)
    }

    const closeAddDuckForm = () => {
        setCurrentDuck(undefined)
        setAddDuckFormOpen(false)
    }

    const submitDuck = (color, size, price, quantity) => {
        if (currentDuck) {
            editDuck(color, size, price, quantity)
        } else {
            addDuck(color, size, price, quantity)
        }
    }

    const openOrderForm = () => {
        setOrderFormOpen(true)
    }

    const closeOrderForm = () => {
        setOrderFormOpen(false)
    }

    const submitOrder = async (order) => {
        console.log('submitting order', order)
        const response = await fetch(`${apiURL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        const data = await response.json()
        console.log(data)
    }
    
    return (
        <div>
        <h1>Duck Warehouse</h1>
        <button onClick={() => openAddDuckForm()}>Add Duck</button>
        <button onClick={() => openOrderForm()}>Order Ducks</button>
        { addDuckFormOpen && <AddDuckForm submitDuck={submitDuck} currentDuck={currentDuck} closeForm={closeAddDuckForm} />}
        { orderFormOpen && <OrderForm submitOrder={submitOrder} closeForm={closeOrderForm} />}
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {ducks.map(duck => (
                <tr key={duck._id}>
                    <td>{duck._id}</td>
                    <td>{duck.color}</td>
                    <td>{duck.size}</td>
                    <td>{duck.price}</td>
                    <td>{duck.quantity}</td>
                    <td>
                        <button onClick={() => openAddDuckForm(duck)}>Edit</button>
                        <button onClick={() => deleteDuck(duck.color, duck.size)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default Warehouse;