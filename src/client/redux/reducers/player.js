const initialState = {
    hand: []
  };
  
  const PlayerReducer = (state = initialState, action = {}) => {
    switch(action.type) {
      case "UPDATE_HAND":
        state = {
          ...state,
          hand: [...action.payload]
        };
        break;
    }
    return state;
  };
  
  export default PlayerReducer;