const initialState = {
  lobbies: [],
  currentLobby: {}
};

const LobbyReducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case "UPDATE_LOBBIES":
      state = {
        ...state,
        lobbies: [...action.payload]
      };
      break;
    case "UPDATE_CURRENTLOBBY":
      state = {
        ...state,
        currentLobby: action.payload
      };
      break;
  }
  return state;
};

export default LobbyReducer;