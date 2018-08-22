exports.handleAsyncError = ( asyncFn ) => async ( req, res, next ) => { // eslint-disable-line import/prefer-default-export
  try {
    await asyncFn(req, res, next);
  }
  catch ( error ) {
    next( error );
  }
};
