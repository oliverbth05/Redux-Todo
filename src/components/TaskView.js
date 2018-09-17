import React from 'react';
import moment from 'moment';

const TaskView = (props) => {
    return (
        <div className = 'section-container'>
        
            <h1 className = 'heading sm'>
                Selected: {props.selected ? props.selected.title : 'None'}
            </h1>
            
            {props.selected ?
            <div className = 'task-viewer'>
                <div className ='task-section'>
                    <label>Description</label>
                    <p>{props.selected.description || 'No description provided.'}</p>
                </div>
                
                <div className ='task-section'>
                    <label>Date Created</label>
                    <p>{new moment(props.selected.createdAt).format('YYYY-MM-DD')}</p>
                </div>
                
                <div className ='task-section'>
                    <label>Due Date</label>
                    <p>{props.selected.dueDate}</p>
                </div>
                
                <div className = 'task-buttons'>
                    <button onClick = {props.editMode} ><i class="fas fa-edit"></i> Edit</button>
                    <button onClick = { () => {props.completeTask(props.currentIndex)}}><i class="fas fa-check-circle"></i> Complete</button>
                </div>
            </div>
            
            : null}
        </div>
        )
}

export default TaskView