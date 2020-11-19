export const actionRegister = (data) => {
  return {
    type: "REGISTER",
    payload: { data: data },
  };
};
