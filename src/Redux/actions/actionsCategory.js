function deleteCategory(categoryName) {
  return {
    type: "DELETE_CATEGORY",
    payload: categoryName,
  };
}

function showCategories(categories) {
  return {
    type: "DELETE_CATEGORY",
    payload: categories,
  };
}

function addCategory(category) {
  return {
    type: "ADD_CATEGORY",
    payload: category,
  };
}

export default { showCategories, deleteCategory, addCategory };
