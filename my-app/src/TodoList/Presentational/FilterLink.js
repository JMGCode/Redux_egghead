const FilterLink = ({
    active,
    children,
    onClick
})=>{
    if(active){
        return <span>{children}</span>
    }

    return(
        <a href="#" 
            onClick={e=>{
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
};

export default FilterLink;

// store.dispatch({
//     type: 'SET_VISIBILITY_FILTER',
//     filter
// });