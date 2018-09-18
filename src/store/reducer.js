import moment from 'moment';

const initialState = {
    tasks: [],
    selected: null,
    currentIndex: null,
    createMode: false,
    editMode: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODE':
            return {
                ...state,
                createMode: !state.createMode
            }
            
        case 'TOGGLE_EDIT':
            return {
                ...state,
                editMode: !state.editMode
            }
            
        case 'CREATE_TASK':
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            }
            
        case 'SELECT_TASK' :
            
            return {
                ...state,
                selected: state.tasks[action.index],
                currentIndex: action.index
            }
        
        case 'UPDATE_TASK':
            var arr = [...state.tasks];
            arr.splice(action.index, 1, action.update);
            console.log(action.index, action.update)
            return {
                ...state,
                tasks: arr,
                editMode: false,
                createMode: false,
                selected: action.update
            }
            
        case 'COMPLETE_TASK' :
            
            var arr = [...state.tasks];
            arr.splice(action.index, 1);
            return {
                ...state,
                tasks: arr,
                selected: null,
                currentIndex: null
            }    
            
        case 'COMPLETE_ALL' :
            return {
                ...state,
                tasks: [],
                selected: null
            }
    }
    return state
}
export default reducer;