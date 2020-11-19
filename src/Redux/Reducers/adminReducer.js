function adminReducer(state = {}, action) {
  switch (action.type) {
    case "REGISTER":
      return { ...action.payload.data };

    default:
      return {};
  }
}
export default adminReducer;
