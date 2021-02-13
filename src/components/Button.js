import React from 'react';

export default function Button(props) {

    return (
      <div className="button" type={props.type} onClick={props.handleButtonClick}>{props.value}</div>
    )
}