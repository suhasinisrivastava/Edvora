export const initialState={
    state:"",
    city:"",
};

const reducer=(state,action)=>{
    switch(action.type){
        case "STATE" : 
            return {
                state :action.state,
            }
        case "CITY" :
            return {
                city : action.city,
            }
    }
}

export default reducer;