import { authView } from '../../../app/stores/views';

export const useFetchUser = () => {
  return { ...authView.createFetchUserData() };
};
