export default (state, action) => {
  switch (action.type) {
    case "INITIALIZE_DEALS":
      return action.data;
    case "CREATE_DEAL":
      return [...state, action.payload];
    default:
      return state;
  }
};
