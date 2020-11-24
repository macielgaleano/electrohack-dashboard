function deleteCategory(categoryName) {
  return {
    type: "DELETE_CATEGORY",
    payload: categoryName,
  };
}

function showCategories(categories) {
  return {
    type: "SHOW_CATEGORIES",
    payload: categories,
  };
}

function addCategory(category) {
  return {
    type: "ADD_CATEGORY",
    payload: category,
  };
}

function updateCategory(newCategoryName, categoryName) {
  return {
    type: "UPDATE_CATEGORY",
    payload: { newCategoryName, categoryName },
  };
}

export { showCategories, deleteCategory, addCategory, updateCategory };
