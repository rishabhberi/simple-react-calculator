import React from 'react';

export default function Display(props) {

  return (
    <div className="display-container">
      <div className="display">{props.value}</div>
    </div>
  )
}