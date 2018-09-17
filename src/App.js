import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from './components/Nav';
import Create from './components/Create';
import TaskList from './components/TaskList';
import TaskView from './components/TaskView';
import EditModal from './components/EditModal';

import './css/App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
        
        <h1 className = 'heading lg'>
          Redux Task Manager
        </h1>
        
        <Nav completeAll = {this.props.completeAll} createMode = {this.props.createMode} toggleMode = {this.props.toggleMode} />
        
        {!this.props.createMode ?
        <div className = 'grid-2'>
          <TaskList />
          <TaskView currentIndex = {this.props.currentIndex} selected = {this.props.selected} editMode = {this.props.toggleEdit} completeTask = {this.props.completeTask} />
        </div>
        :
        <div className = 'page-container'>
          <Create  />
        </div>
        }
        
        {this.props.editMode ?
        <div>
          <EditModal />
          <div className = 'backdrop'></div>
        </div>
        :
        
        null }
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    selected: state.selected,
    createMode: state.createMode,
    editMode: state.editMode,
    currentIndex: state.currentIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectTask: (index) =>{ dispatch({type: 'SELECT_TASK', index: index})},
    completeTask: (index) => { dispatch({type: 'COMPLETE_TASK', index: index})},
    toggleMode: () => { dispatch({type: 'TOGGLE_MODE'})},
    toggleEdit: () => { dispatch({type: 'TOGGLE_EDIT'})},
    completeAll: () => { dispatch({type: 'COMPLETE_ALL'})}
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
