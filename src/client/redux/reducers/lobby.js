const initialState = {
  lobbies: [],
  currentLobby: null
};

const LobbyReducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case "UPDATE_LOBBIES":
      state = {
        ...state,
        lobbies: [...action.payload]
      };
      break;
    case "SET_CURRENTLOBBY":
      state = {
        ...state,
        currentLobby: action.payload
      };
      break;
  }
  return state;
};

export default LobbyReducer;