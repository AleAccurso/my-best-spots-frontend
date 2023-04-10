import { combineReducers } from 'redux';
import spotReducer from "@/store/reducers/spot"
import filtersReducer from "@/store/reducers/filter";
import commonReducer from "@/store/reducers/common"

const reducers = combineReducers({
  common: commonReducer,
  spots: spotReducer,
  filters: filtersReducer
});

export default reducers;