export const ErrorHandler = (hanlder) => {
  return async (req, res, next) => {
    try {
      await hanlder(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
