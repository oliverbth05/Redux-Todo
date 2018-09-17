import React from 'react';

const Nav = (props) => {
    return (
        <div className = 'button-menu'>
        {props.createMode ?
            <button onClick = {() => {props.toggleMode()}} className = 'button button-lg'><i class="fas fa-tasks"></i> Tasks Menu</button>
        :
            <div>
                <button onClick = {() => {props.toggleMode()}} className = 'button button-lg'><i class="fas fa-plus"></i> Create New Task</button>
                <button onClick = {() => {props.completeAll()}}className = 'button button-lg'>Complete All</button>
            </div>
        }    
           
        </div>
    )
}

export default Nav;