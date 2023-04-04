const initialState = {
    all_data : []
  };

const getReducer = (state=initialState, action) => {
    switch(action.type){
        case "ALL_DATA":
            return {
                ...state,
                all_data : action.data
            }
        default:
            return state;
    }
}

export default getReducer