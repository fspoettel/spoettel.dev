require('dotenv').config();

const debug = require('debug')('app:server');
const app = require('./app');

app.listen(app.get('port'), () => {
  debug(`App is running on port ${app.get('port')}`);
  debug('Press Ctrl-C to stop it\n');
});
