import { API_URL } from './config'

const apirequest = (server, method, request, data = null) => {
  let url;
  switch (server) {
    case 'apiPostRequest':
      url = `${API_URL + request}`;

      return fetch(
        url,
        {
          method,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        },
      );
    case 'apiGetRequest':
      url = `${API_URL + request}`;
      return fetch(
        url,
        {
          method,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

    default:
        break;
  }
};

export default apirequest;
