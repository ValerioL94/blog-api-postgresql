const signupReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE INPUT TEXT':
      return {
        ...state,
        [action.field]: action.payload,
      };
    case 'HANDLE SHOW PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'HANDLE SHOW CONFIRM':
      return { ...state, showConfirm: !state.showConfirm };
    case 'HANDLE SHOW AUTHOR_KEY':
      return { ...state, showAuthorKey: !state.showAuthorKey };
    default:
      return state;
  }
};

export default signupReducer;
