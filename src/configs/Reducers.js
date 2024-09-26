export const MyUserReducer = (current, action) => {
    switch (action.type) {
        case "login":
            console.log('user reducer is being called', action.payload)
            return action.payload;
        case "logout":
            return null;
    }
    return current;
}