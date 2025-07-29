import { authView } from '../../../app/stores/views';

export const useSignOut = () => {
  return { ...authView.createSignOutData() };
};
