const { ADD_PROJECT } = require("./ActionTypes");

let initialState = {
  projects: [],
};

const reducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [
          {
            ...action,
            id: Date.now(),
          },
          ...state.projects,
        ],
      };

    default:
      return state;
  }
};

export default reducer;
