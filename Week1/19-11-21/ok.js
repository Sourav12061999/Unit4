const authorise = (permission) => {
  return (req, res, next) => {
    const originalSendFunc = res.send.bind(res);
    res.send = function (body) {
      body.name = "Nrupul Dev";
      console.log(body); // do whatever here
      return originalSendFunc(body);
    };
    next();
  };
};
