import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
class Create extends Component {
    constructor(){
        super();
        this.formChangeHandler = this.formChangeHandler.bind(this)
        
        this.state = {
            title: '',
            description: '',
            dueDate: '',
            titleError: false,
            dateError: false
        }    
        
    }
    
    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        
        if (this.state.title) {
            this.setState({
                titleError: false
            })
        }
        
        if (new Date(this.state.dueDate) > new Date()) {
            this.setState({
                dateError: false
            })
        }
    }
    
    createTask() {
        //Form Validation
        if (!this.state.title) {
            this.setState({
                titleError: true
            })
        }
        
        if(!this.state.dueDate || new Date(this.state.dueDate) < new Date()) {
            this.setState({
                dateError: true
            })
            console.log('date error')
        }
        
        else {
            if (this.state.title && new Date(this.state.dueDate) > new Date()) {
                var task = {
                    title: this.state.title,
                    description: this.state.description,
                    dueDate: this.state.dueDate,
                    createdAt: new moment()
            }
            
            this.props.createTask(task)
            
            this.setState({
                title: '',
                description: '',
                dueDate: '',
            })
            
            this.props.toggleMode()
            }
        }
          
    }
    
    render() {
        return (
        <div className = 'create'>
        <h1 className = 'heading sm'>
            Create New Task
        </h1>
        
        <div className = 'create-form'>
            <div className = 'create-form-group'>
                <label>Title</label>
                <input onChange = {this.formChangeHandler} name = 'title' className = {this.state.titleError ? 'error' : null }/>
            </div>
            
            <div className = 'create-form-group'>
                <label>Description</label>
                <textarea onChange = {this.formChangeHandler} name = 'description'></textarea>
            </div>
            
            <div className = 'create-form-group'>
                <label>Due Date</label>
                <input onChange = {this.formChangeHandler} className = {this.state.dateError ? 'error' : null } type = 'date' name = 'dueDate' />
            </div>
            
            <div className = 'create-form-group'>
                 <button onClick = {this.createTask.bind(this)}>Create</button>
            </div>
        </div>
       {this.state.titleError ?  <p className = 'error-message'>*Task requires a title field</p>: null}
       {this.state.dateError ?  <p className = 'error-message'>*Due date must be greater than today's date</p>: null}
        </div>
        )
}
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
         createTask: (task) =>{ dispatch({type: 'CREATE_TASK', payload: task})},
         toggleMode: () => { dispatch({type: 'TOGGLE_MODE'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)