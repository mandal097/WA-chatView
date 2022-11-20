import React from 'react'
import { useLocation } from 'react-router-dom';

const Category = () => {
  const location = useLocation();
  const activeState = location.pathname.split('/')[3];
  return (
    <div style={{fontSize:'4rem',color:'white'}}>Category : {activeState}</div>
  )
}

export default Category