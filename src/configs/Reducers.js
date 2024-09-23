export const MyUserReducer = (current, action) => {
    switch (action.type) {
        case "login":
            console.log(Math.random(), action.payload)
            return action.payload;
        case "logout":
            return null;
    }
    return current;
}