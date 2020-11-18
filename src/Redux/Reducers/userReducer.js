function userReducer(state = {}, action) {
  switch (action.type) {
    case "REGISTER":
      return { ...action.payload.data };

    default:
      return {};
  }
}
export default userReducer;
