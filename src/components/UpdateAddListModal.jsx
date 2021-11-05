import { Modal } from 'antd';
import AddButton from './AddButton';
import ListForm from './ListForm';


export default function UpdateAddListModal(props) {
    return (
        <div>
            <Modal 
                title={props.title} 
                visible={props.visible} 
                footer={(<AddButton text="Modifier" shape="round" handleClick={props.onUpdate} />)} 
                onCancel = {props.onClose}
                >
                <ListForm 
                 listName={props.listName}
                 listColor={props.listColor}
                 changeName={props.changeName}
                 changeColor={props.changeColor}
                />

            </Modal>
        </div>
    );
};