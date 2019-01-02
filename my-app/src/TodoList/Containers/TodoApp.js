import React from 'react';
// import AddTodo from '../Presentational/AddTodo';
// import TodoList from '../Presentational/TodoList';
// import Footer from '../Presentational/Footer';

function TodoApp  ({
    todos,
    visibilityFilter
})
{
    return(
    <div>
        <AddTodo
            onAddClick={text=>store.dispatch({
                type:'ADD_TODO',
                id:nextTodoId++,
                text
            })}
        />

        <TodoList
            todos = {getVisibleTodos(
                todos,
                visibilityFilter
            )}
            onTodoClick={id=>
                store.dispatch({
                    type:'TOOGLE_TODO',
                    id
                })}
        />

        <Footer
            visibilityFilter={visibilityFilter}
            onFilterClick={filter=>
                store.dispatch({
                    type:'SET_VISIBILITY_FILTER',
                    filter
                })
            }
        />
    </div>
    );
}

// function TodoApp(){
//     return (
//     <p>hola</p>
//     );
// }

export default TodoApp;