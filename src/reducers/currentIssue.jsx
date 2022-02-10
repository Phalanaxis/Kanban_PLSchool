const initialState = {
    issue: {
        id: '', 
        title: '', 
        priority: '', 
        storyPoints: '', 
        description: '',
    },
    status: '',
};

export default function currentIssue(state = initialState, action) {
    if (action.type === 'SET_ISSUE') {
        return action.payload;
    }
    return state;
};