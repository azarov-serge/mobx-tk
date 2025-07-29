import { authView } from '../../../app/stores/views';

export const useCheckAuth = () => {
  return { ...authView.createCheckAuthData() };
};
