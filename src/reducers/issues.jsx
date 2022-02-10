const initialState =  [
    {
      id: 1,
      status: "TO DO",
      issues: [
        {
          id: "FC7",
          title: "Critical Task One",
          priority: "critical",
          storyPoints: 2,
          description: "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
        },
        {
          id: "M14",
          title: "Normal Task",
          priority: "medium",
          storyPoints: 3,
          description: "As an external contributor, I want to be able to see status of uploaded materials",
        },
      ],
    },
    {
      id: 2,
      status: "IN PROGRESS",
      issues: [],
    },
    {
      id: 3,
      status: "TEST",
      issues: [],
    },
    {
      id: 4,
      status: "DONE",
      issues: [],
    },
  ]
  
  export default function issues(state = initialState, action) {
    if (action.type === 'ADD_ISSUE') {
      return [
        ...state,
        action.payload
      ];
    }
    return state;
  }