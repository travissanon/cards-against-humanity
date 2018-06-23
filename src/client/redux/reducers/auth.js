const initialState = {
  user: null,
  connection: null
};

const AuthReducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case "SET_USER":
      state = {
          ...state,
          user: action.payload
      };
      break;
  }

  return state;
};

export default AuthReducer;