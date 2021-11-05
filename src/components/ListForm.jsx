import React from 'react'
import {Input} from 'antd'

export default function ListForm(props) {
    return (
        <div>
            <form>
                <label htmlFor="Nom">Nom de votre liste</label>
                <Input type="text" placeholder="Le nom de la liste" name="Nom" id="Nom" value={props.listName} onChange ={(event) => props.changeName(event.target.value)}  />
                <label htmlFor="couleurs">Couleurs</label>
                <Input type="color" name="couleurs" id="couleurs" value={props.listColor} onChange={(event) => props.changeColor(event.target.value)} />
            </form>
        </div>
    )
}
