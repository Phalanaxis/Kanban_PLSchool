const initialState = '';

export default function filterIssues (state =initialState, action){
    if (action.type === 'FIND_ISSUE'){
        return action.payload;
    }
    return state;
}
