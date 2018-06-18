const initialState = {
    username: '',
    connection: null
};

const UserReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case "SET_USERNAME":
            state = {
                ...state,
                username: action.payload
            };
            break;
    }

    return state;
};

export default UserReducer;