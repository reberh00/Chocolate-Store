async function logRequest(req, res, next) {
  const currentDate = new Date();
  console.log(
    `\n${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()} ` +
      `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}.${currentDate.getMilliseconds()}` +
      ` Incomming ${req.method} ${req.originalUrl} request`
  );
  console.log(`--- Request Body ---`);
  console.log(req.body);
  next();
}

export default logRequest;
