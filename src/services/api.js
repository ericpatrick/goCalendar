class Api {
  response = {
    status: 200,
    data: {},
  };

  get = url => {
    if (url === '/authenticate') {
      this.response.data = {
        token: '123456',
      };
    }

    if (url.contains('phone')) {
      const path = url.split('/');
      const phone = path[2];
      if (phone.startsWith('9')) {
        this.response.data = {
          phone,
        };
      } else {
        this.response.status = 404;
      }
    }

    return new Promise(resolve => resolve(this.response));
  };

  post = (url, params) => {
    if (url.contains('authenticate')) {
      const { user, password } = params;
      if (user.length >= 3 && password.length >= 3) {
        this.response.data = {
          token: '123',
        };
      } else {
        this.response.status = 401;
      }
    }
    return new Promise(resolve => resolve(this.response));
  };
}

export default new Api();
