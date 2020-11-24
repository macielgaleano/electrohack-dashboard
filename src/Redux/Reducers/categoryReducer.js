function categoryReducer(state = [], action) {
  switch (action.type) {
    case "SHOW_CATEGORIES":
      return [...state, action.payload];
    case "DELETE_CATEGORY":
      return state.filter((category) => category.name !== action.payload);
    case "ADD_CATEGORY":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default categoryReducer;
