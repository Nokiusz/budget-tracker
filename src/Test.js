import React, { useEffect, useState } from 'react'

const Test = () => {
    const [data, setData] = useState([])
    const BASE_URL = 'http://192.168.0.157:5000/api'
    const fetchData = async () => {
        const data = await fetch(`${BASE_URL}/transactions/list`);
        const dataJson = await data.json();

        setData(dataJson.rows);
        console.log(dataJson)
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            {data.map(item => (
                <div key={item.id}>
                    <p>{item.id} {item.name}</p>
                    <p>{item.descriptions}</p>
                    <p>{item.type} {item.category}</p>
                    <p>{item.value} {item.currency}</p>
                    <p>{item.priority}</p>
                    <p>{item.date}</p>
                </div>
            ))}
        </>
    )
}

export default Test