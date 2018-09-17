import React, {Component} from 'react';
import Task from './Task';
import moment from 'moment';
import {connect} from 'react-redux';

class TaskList extends Component {
    
    constructor(props) {
        super(props);
    }
    render() {
        
 
    const tasksMapped = this.props.tasks.map((task, index) => {
        return <Task 
            style = { this.props.currentIndex === index ? 'task-selected' : 'task' }
            index = {index}
            title = {task.title} 
            daysLeft = {new moment(task.dueDate).diff(task.createdAt, 'days')}
            hoursLeft = { new moment(task.dueDate).diff(task.createdAt, 'hours')}
            completeTask = {this.props.completeTask}
            selectTask= {this.props.selectTask}/>
    })

    return (
        <div className = 'section-container'>
            <h1 className = 'heading sm'>
                Active Tasks: {this.props.tasks.length}
            </h1>
            
            {this.props.tasks.length > 0 ?
            <ul className = 'task-list'>
                {tasksMapped}
            </ul>
            :
            <p className = 'message'>
                No Active Tasks
                <br />
                <i className="fas fa-ellipsis-h"></i>
            </p>
            }
        </div>
        )
    }
   }

const mapStateToProps = (state) => {
    return {
        currentIndex: state.currentIndex,
        tasks: state.tasks,
        selected: state.selected,
        createMode: state.createMode,
        editMode: state.editMode
    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeTask: (index) => {dispatch({type: 'COMPLETE_TASK', index : index})},
        selectTask: (index) =>{ dispatch({type: 'SELECT_TASK', index: index})},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);