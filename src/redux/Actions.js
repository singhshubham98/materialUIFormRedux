import { ADD_PROJECT } from "./ActionTypes";

export const addProject = (item) => {
  return {
    type: ADD_PROJECT,
    item: item,
  };
};
