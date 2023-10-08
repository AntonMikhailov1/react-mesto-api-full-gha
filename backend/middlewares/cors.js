const allowList = [
  'http://antonmikhailov.nomoredomainsrocks.ru',
  'https://antonmikhailov.nomoredomainsrocks.ru',
  'http://51.250.6.53',
  'https://51.250.6.53',
  'http://localhost:3000',
  'http://localhost:3001',
];

const allowMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
