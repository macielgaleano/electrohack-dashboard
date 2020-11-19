import { REHYDRATE } from "redux-persist";
function adminReducer(state = {}, action) {
  switch (action.type) {
    case REHYDRATE:
      if (state.payload) {
        return { ...state.payload.admin.token };
      }
      return state;

    case "REGISTER":
      return { ...action.payload.data };

    default:
      return {};
  }
}
export default adminReducer;
