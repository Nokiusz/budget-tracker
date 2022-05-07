import React from 'react'
import '../css/List.css'


const ListItem = ({ id, description, value, category, currency, currencySymbol, type, priority, date }) => {
    const className = type === 'expense' ? 'transaction--expense' : 'transaction--income';
    return (
        <div key={id} >
            <p className={className}>{value} {currencySymbol}</p>
            <p>{type}</p>
            <p>{description}</p>
            <p>{category}</p>
            <p>{priority}</p>
            <p>{date}</p>
        </div>
    )
}

export default ListItem