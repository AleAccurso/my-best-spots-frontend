import { combineReducers } from 'redux';
import spotReducer from "@/store/reducers/spot"
import filtersReducer from "@/store/reducers/filter";

const reducers = combineReducers({
  spots: spotReducer,
  filters: filtersReducer
});

export default reducers;