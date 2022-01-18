const { route } = require('next/dist/server/router');

const routes = require('next-routes')();

routes
    .add('/campaign/new','/campaign/new')
    .add('/campaign/:address', '/campaign/show')
    .add('/campaign/:address/requests', '/campaign/requests/index')
module.exports = routes;