const initialState = [];

export default function currentIssue(state = initialState, action) {
    if (action.type === 'SET_BREADCRUMBS') {
        return action.payload;
    }
    return state;
};