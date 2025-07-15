import { authView } from '../../../app/stores/views';

export const useSignIn = () => {
  return { ...authView.createSignInData() };
};
