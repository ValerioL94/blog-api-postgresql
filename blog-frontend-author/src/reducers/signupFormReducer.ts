import { SignupReducerAction, TSignupForm } from '../types/types';

export const initialFormState: TSignupForm = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  authorKey: '',
  showPassword: false,
  showConfirm: false,
  showAuthorKey: false,
};

export const signupReducer = (
  state: TSignupForm,
  action: SignupReducerAction
) => {
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
    case 'RESET FORM':
      return { ...initialFormState };
    default:
      return state;
  }
};
