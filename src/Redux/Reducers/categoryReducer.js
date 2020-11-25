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
      const categorySearched = state.find((category) => {
        return category.name === action.payload.newCategoryName;
      });
      console.log(categorySearched);
      if (!categorySearched) {
        return state.map((category) => {
          if (category.name === action.payload.categoryName) {
            return { ...category, name: action.payload.newCategoryName };
          } else {
            return category;
          }
        });
      }

    default:
      return state;
  }
}

export default categoryReducer;
