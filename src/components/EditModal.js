import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class EditModal extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            title: this.props.selected.title,
            description: this.props.selected.description,
            dueDate: this.props.selected.dueDate,
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
    
    updateTask() {
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
            
        }
        
        else {
            if (this.state.title && new Date(this.state.dueDate) > new Date()) {
                var task = {
                    title: this.state.title,
                    description: this.state.description,
                    dueDate: this.state.dueDate,
                    createdAt: new moment()
                }
                console.log('PASSED VALIDATION')
                this.props.updateTask(this.props.currentIndex, task)
            }
        }
          
    }
    
    render(){
        return(
            <div className = 'edit-modal'>
                
                <h1 className = 'heading sm'>Editing: {this.state.title}</h1>
                
                <div className = 'create-form'>
                    <div className = 'create-form-group'>
                        <label>Title</label>
                        <input className = {this.state.titleError ? 'error' : null } onChange = {this.formChangeHandler.bind(this)} value = {this.state.title} name = 'title'/>
                    </div>
            
                    <div className = 'create-form-group'>
                        <label>Description</label>
                        <textarea onChange = {this.formChangeHandler.bind(this)}value = {this.state.description} name = 'description'></textarea>
                    </div>
            
                    <div className = 'create-form-group'>
                        <label>Due Date</label>
                        <input className = {this.state.dateError ? 'error' : null }  onChange = {this.formChangeHandler.bind(this)}type = 'date'  value = {this.state.dueDate} name = 'dueDate'/>
                    </div>
            
                    <div className = 'create-form-group'>
                        <button onClick = {this.updateTask.bind(this)}><i class="fas fa-save"></i> Update</button>
                    </div>
                    
                    <div className = 'create-form-group'>
                        <button onClick = { () => {this.props.toggleEdit()}}><i class="far fa-times-circle"></i> Cancel</button>
                    </div>
                    
                    {this.state.titleError ?  <p className = 'error-message'>*Task requires a title field</p>: null}
                    {this.state.dateError ?  <p className = 'error-message'>*Due date must be greater than today's date</p>: null}
                </div>
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        selected: state.selected,
        editMode: state.editMode,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (index, update) => { dispatch({type:'UPDATE_TASK', index: index, update: update})},
        toggleEdit: () => { dispatch({type: 'TOGGLE_EDIT'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)