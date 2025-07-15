export class AppNavigator {
  navigate?: (path: string) => void;

  constructor(navigate?: (path: string) => void) {
    this.navigate = navigate;
  }

  setNavigate(navigate: (path: string) => void) {
    this.navigate = navigate;
  }
}

export const appNavigator = new AppNavigator();
