function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                username: action.username,
                access_token: action.access_token,
            };
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}

function todoReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [action.todo, ...state];
        case "GET_TODOS":
            return action.todos;
        case "DELETE_TODO":
            state = state.filter((obj) => obj._id !== action.id);
            return state;
        case "CLEAR_TODOS":
            return [];
        default:
            return state;
    }
}

export default function appReducer(state, action) {
    return {
        user: userReducer(state.user, action),
        todos: todoReducer(state.todos, action),
    };
}