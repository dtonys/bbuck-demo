export const clientRequest = ( url, options = {}) => { // eslint-disable-line
  const defaults = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if ( options.body && typeof options.body === 'object' ) {
    options.body = JSON.stringify(options.body);
  }

  return new Promise((resolve, reject) => {
    fetch(url, {
      ...defaults,
      ...options,
    })
      .then(( response ) => {
        return response.json()
          .then(( body ) => {
            if ( response.ok ) {
              resolve(body);
              return;
            }
            reject({
              ...body,
              status: response.status,
            });
          });
      });
  });

};
