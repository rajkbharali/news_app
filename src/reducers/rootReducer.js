import { combineReducers } from "redux";
import getReducer from "./getReducer";

const rootReducer = combineReducers({
    dataDetails : getReducer
});

export default rootReducer;