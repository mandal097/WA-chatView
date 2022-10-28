import React from 'react';
import { useLocation } from 'react-router-dom';
import Details from '../Details/Details'

const About = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2]
  return (
    <div>
      <Details id={id}/>
    </div>
  )
}

export default About