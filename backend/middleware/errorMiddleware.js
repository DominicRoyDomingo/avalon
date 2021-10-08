const notFound = (request, response, next) => {
  const ERROR = new Error(`${request.originalUrl} endpoint does not exists`);

  response.status(404);
  next(ERROR);
};

const serverError = (error, request, response, next) => {
  const STATUSCODE = response.statusCode === 200 ? 500 : response.statusCode;

  response.status(STATUSCODE);
  response.json({
    message: error.message,
    stack: error.stack,
  });
};

export { notFound, serverError };
