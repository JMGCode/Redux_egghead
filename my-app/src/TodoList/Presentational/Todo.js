const Todo = ({
    onClick,
    completed,
    text})=>{
<li 
    onClick = {onClick}
    style = {{
        textDecoration:
            completed?'line-through':'none'
    }}
>
    {text}
</li>
};

export default Todo;

// ()=>{
//     store.dispatch({
//         type:'TOOGLE_TODO',
//         id: todo.id,
//     });
// }