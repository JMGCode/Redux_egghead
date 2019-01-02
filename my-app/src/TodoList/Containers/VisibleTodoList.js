import React from 'react';

class VisibleTodoList extends Component{

    componentDidMount(){
        store.subscribe(()=>{
            this.forceUpdate()
        });
    }

    componentWillMount(){
        this.unsubscribe();
    }
    
    render(){
        const props = this.props;
        const state = store.getState();

        return(
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick = {id=>{
                    store.dispatch({
                        type:'TOOGLE_TODO',
                        id
                    })
                }}
            />
        );
    }
}