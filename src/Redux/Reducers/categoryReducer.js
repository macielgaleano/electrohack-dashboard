function categoryReducer(state = [], action) {
  switch (action.type) {
    case "SHOW_CATEGORIES":
      console.log(state);
      console.log(action.payload);
      return [...action.payload];
    case "DELETE_CATEGORY":
      return state.filter((category) => category.name !== action.payload);
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "UPDATE_CATEGORY":
      return [
        ...state,
        state.map((category) => {
          return category.name === action.payload.categoryName
            ? { ...category, name: action.payload.newCategoryName }
            : category;
        }),
      ];
    default:
      return state;
  }
}

export default categoryReducer;
