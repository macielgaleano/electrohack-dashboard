function categoryReducer(state = [], action) {
  switch (action.type) {
    case "SHOW_CATEGORIES":
      return [...action.payload];
    case "DELETE_CATEGORY":
      return state.filter((category) => category.name !== action.payload);
    case "ADD_CATEGORY":
      if (action.payload) {
        return [...state, action.payload];
      } else {
        return state;
      }

    case "UPDATE_CATEGORY":
      return state.map((category) => {
        return category.name === action.payload.categoryName
          ? { ...category, name: action.payload.newCategoryName }
          : category;
      });

    default:
      return state;
  }
}

export default categoryReducer;
