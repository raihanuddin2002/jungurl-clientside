export default function reducer(state, action) {

    switch (action.type) {
        case "LOGIN":
            return { ...state, ...action.loginActions };

        case "LOGOUT":
            return { ...state, ...action.logOutActions };

        case "DELETE_WORD":
            return { ...state, isDelete: action.payload };

        default:
            return { ...state };
    }
}