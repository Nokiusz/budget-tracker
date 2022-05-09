import React from 'react'
import { useParams } from 'react-router-dom';
const Edit = (props) => {
    const { id } = useParams();
  return (
    <div>Edit transaction id: {id}</div>
  )
}

export default Edit