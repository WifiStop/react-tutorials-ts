import { combineReducers } from 'redux'
const test = ()=>{
    return {
        list: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        }
      }
}


const concatReducers = combineReducers({
test
})

export default concatReducers