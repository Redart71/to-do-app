import React from 'react';
import { Modal } from 'antd';
import ListForm from './ListForm';
import AddButton from './AddButton';

export default function AddListModal(props) {
    return (
        <div>
            <Modal 
                title={props.title} 
                visible={props.visible} 
                footer={(<AddButton text="Créer une liste" handleClick= {props.onSubmit} shape="round" type="primary" />)} 
                onCancel = {props.onClose}

                >
              <ListForm 
               
                changeName={props.changeName}
                changeColor={props.changeColor}
                />
            </Modal>
        </div>
    );
};
