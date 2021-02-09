const initialState = {

};

const appReducer = (state = initialState, action) => {
    const { type, payload } = action;
    const newState = { ...state };

    switch (type) {
    case 'TEST':
        console.log('TEST action happened', payload);
        newState.test = payload;
        break;

    default:
        console.log('unknown action', type, payload);
    }

    return newState;
};

export default appReducer;
