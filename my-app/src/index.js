import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {Component} from 'react';

// import TodoApp from './TodoList/Containers/TodoApp'

// const initialState={

// }

// const store = createStore(
//     (state)=>state,
//     initialState
// ) 
// ===============================================

//Update a singel todo (used in todos)

const todo = (state, action)=>{
    switch (action.type){
        case 'ADD_TODO':
            return {
                id:action.id,
                text:action.text,
                completed:false
            };
        case 'TOOGLE_TODO':
            if(state.id !== action.id){
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
}

//Reducer of the entire application
const todos = (state=[],action)=>{
    switch(action.type)
    {
        case 'ADD_TODO':
            return[
                ...state,
                todo(undefined,action)
            ];
        case 'TOOGLE_TODO':
            return state.map(t=>todo(t,action));
        default:
            return state;
    }
};

const testAddTodo = () =>{
    const stateBefore=[];
    const action={
        type:'ADD_TODO',
        id:0,
        text:'Learn Redux'
    };

    const stateAfter = [
        {
            id:0,
            text:'Learn Redux',
            completed:false
        }
    ];


};

//reducer of visibility
const visibilityFilter = (state ='SHOW_ALL',action)=>{
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

//combining two reducers
const todoApp = (state ={},action) =>{
    return{
        //Reducer principal
        todos:todos(
            state.todos,
            action
        ),
        //reducer of visibility
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    };
}

//Second way to combine reducers
const _todoApp = combineReducers({
    // todos:todo,
    // visibilityFilter:visibilityFilter
    todos,
    visibilityFilter
});

//New component, filter is a string  and children is the content if the link
const FilterLink = ({
    filter,
    currentFilter,
    children 
})=>{
    if(filter === currentFilter){
        return <span>{children}</span>
    }
    return(
        <a href="#" onClick={e =>{
            e.preventDefault();
            store.dispatch({
                type:'SET_VISIBILITY_FILTER',
                filter
            })
            }
        }>
            {children}
        </a>
    );
}


//New funtion filter the todos according to the filter value
//Note: is called before the app is render  in TodoApp
const getVisibleTodos =(todos,filter)=>{
    switch(filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t=>t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t=>!t.completed);
        default:
            return todos;
    }
}

// ===============================================
let nextTodoId=0;
class TodoApp extends Component{
    render(){
        const {
            todos,
            visibilityFilter
        } = this.props;
        //Visibility Filter
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );

        return(
            <div>
                <input ref={node=>{
                    this.input =node;
                }}/>
                <button onClick = {()=>{
                        store.dispatch({
                            type:'ADD_TODO',
                            text: this.input.value,
                            id:nextTodoId++
                        });
                        this.input.value='';
                    }}
                >
                    ADD TODO
                </button>
                <ul>
                    {/* this.props.todos  was replaced for visibleTodos*/}
                    {visibleTodos.map(todo=>
                        <li key = {todo.id}
                            onClick={()=>{
                               store.dispatch({
                                   type:'TOOGLE_TODO',
                                   id:todo.id
                               }); 
                            }}
                            style={{
                               textDecoration:
                               todo.completed? 'line-through':'none' 
                            }}
                        >
                            {todo.text}
                        </li>
                    )}
                </ul>
                {/* Show the visibility options */}
                <p>
                    Show:
                    {' '}
                    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>
                        All
                    </FilterLink>

                    {', '}
                    <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>
                        Active
                    </FilterLink>

                    {', '}
                    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>
                        Completed
                    </FilterLink>
                </p>
            </div>
        );
    }
}
// ===============================================

const store = createStore(_todoApp);
const render=()=>{
    ReactDOM.render( 
        <TodoApp {...store.getState()}/>
        , document.getElementById('root'));
}
store.subscribe(render);
render();
// ===============================================

// ReactDOM.render( 
// <p>jole</p>
// , document.getElementById('root'));

