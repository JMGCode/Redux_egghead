import React from 'react';

class FilterLink extends Component{
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
            <Link 
                active={
                    props.filter===state.visibilityFilter
                }
                onClick={()=>{
                    store.dispatch({
                        type:'SET_VISIBILITY_FILTER',
                        filter:props.filter
                    })
                }}
            >
                {props.children}
            </Link>
        );
    }
}