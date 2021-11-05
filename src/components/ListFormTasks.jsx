import React from 'react'
import {Input} from 'antd'

export default function ListFormTasks(props) {
    return (
        <div>
            <form>
                <label htmlFor="Tache">Nom de la tâche</label>
                <Input type="text" placeholder="Le nom de la tâche" name="Tache" id="Tache" value={props.listTasks} onChange ={(event) => props.setListTasks(event.target.value)}  />
            </form>
        </div>
    )
}