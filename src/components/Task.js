import React from 'react';
import moment from 'moment';

const Task = (props) => {
    
    return (
        <div className = {props.style} onClick = {() => {props.selectTask(props.index)}}  >
            <button onClick = {()=> {props.completeTask(props.index)}} class = 'button button-sm'  ><i class="fas fa-check-circle"></i> Complete</button>
            <p className = 'task-title'>{props.title}</p>
            <p className = 'task-date'><i class="far fa-clock"></i> {props.daysLeft || props.hoursLeft } {props.daysLeft ? 'Days' : 'Hours'}</p>
        </div>
        )
}

export default Task;