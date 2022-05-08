import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, List as ListAnt, Tag } from 'antd';
import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../context/Context';

import 'antd/dist/antd.css';
import 'antd/dist/antd.less'

const List = () => {
    const { transactionsData, showValues } = useContext(GlobalContext);
    const defaultImgSrc = `${process.env.PUBLIC_URL}/img/categories/default.png`
    const ImgSrc = `${process.env.PUBLIC_URL}/img/categories/`


    const getPriorityColor = (p) => {
        switch (p) {

            case 'low':
                return '#gold'

            case 'medium':
                return 'orange'

            case 'high':
                return 'orange'

            case 'very high':
                return 'red'

            default:
                return 'cyan'
        }

    }


    const handleDelete = (item) => {
        console.log(item.id)
    }
    const handleEdit = (item) => {
        console.log(item.id)
    }

    return (

        <ListAnt
            itemLayout="horizontal"
            dataSource={transactionsData}

            renderItem={item => (

                <ListAnt.Item
                    actions={[
                        <EditOutlined key="edit" onClick={() => handleEdit(item)} />,
                        <DeleteOutlined key="delete" onClick={() => handleDelete(item)} />,
                    ]}
                >

                    <ListAnt.Item.Meta
                        avatar={<img
                            width={32}
                            height={32}
                            src={`${ImgSrc}${item.category}.png`}
                            alt={item.category}
                            onError={event => {
                                event.target.src = defaultImgSrc
                                event.onerror = null
                            }}
                        />}
                        title={`${showValues ? item.value : `??? | ${item.date}`} 
                            ${showValues ? `${item.currencyAcronym} | ${item.date}` :
                                `??? | ${item.date}`} `}
                        description={item.description}

                    />
                    <div className="tags">
                        <Tag color={getPriorityColor(item.priority)}>{item.priority}</Tag>
                        <Tag color={item.type === 'expense' ? 'red' : 'green'}>{item.type}</Tag>
                    </div>


                </ListAnt.Item>
            )
            }
        />


    )
}

export default List