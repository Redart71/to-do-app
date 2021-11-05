import React from 'react'
import {Button, Tooltip} from 'antd'

export default function AddButton(props) {
    return (
        <div>
        <Tooltip title={props.title} color={props.color} align={props.align} overlayStyle={props.overlayStyle}>
           <Button
                type = {props.type} 
                onClick= {props.handleClick}
                shape = {props.shape}
                size = {props.size}
                icon={props.icon}
                
                
                
            >
                {props.text}
            </Button>
        </Tooltip> 
        </div>
    );
};
