import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/Context';
import ListItem from './ListItem.js';

const List = () => {
    const { transactionsData, showValues } = useContext(GlobalContext);

    return (
        <>

            {transactionsData.map(item => (
                <ListItem
                    key={item.id}
                    id={item.id}
                    description={item.description}
                    value={showValues ? item.value : '???'}
                    category={item.category}
                    currency={item.currency}
                    currencySymbol={item.currencySymbol}
                    type={item.type}
                    priority={item.priority}
                    date={item.date} />
            ))
            }
        </>
    )
}

export default List