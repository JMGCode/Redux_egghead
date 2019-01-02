
const AddTodo=({
    onAddClick,
})=>{
    let input;
    return(
        <div>
            <input ref={node=>{this.node=node;}}/>
            <button onClick={()=>{
                onAddClick(input.value);
                input.value='';
            }}>
                Add Todo
            </button>
        </div>
    )
}

export default AddTodo;

// store.dispatch({
//     type:input.value,
//     id:nextTodoId++
// });