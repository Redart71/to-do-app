import { Modal } from 'antd';
import AddButton from './AddButton';
import ListFormTasks from './ListFormTasks';


export default function TasksModal(props) {
    return (
        <div>
            <Modal 
                title={props.title} 
                visible={props.visible} 
                footer={(<AddButton text="Ajouter la tâche" shape="round" handleClick={props.onTasks} />)} 
                onCancel = {props.onClose}
                >
                <ListFormTasks 
                 setListTasks={props.setListTasks}

                />

            </Modal>
        </div>
    );
};