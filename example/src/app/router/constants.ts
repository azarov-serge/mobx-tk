export const AUTH_PATH = 'auth';

export const path = {
  home: '/',

  getLink(...args: string[]) {
    if (!args || !args.length) {
      return this.home;
    }

    const path = args[0];

    if (path && path[0] === '/') {
      return args.join('/');
    }

    return `/${args.join('/')}`;
  },
};
