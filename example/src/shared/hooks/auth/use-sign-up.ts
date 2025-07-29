import { authView } from '../../../app/stores/views';

export const useSignUp = () => {
  return { ...authView.createSignUpData() };
};
