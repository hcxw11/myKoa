const Koa = require('../koa/application');
const Router = require('./router');
const home = require('./controller/home');
const react = require('./controller/react');
const staticFile = require('./middleware/staticFile');

const app = new Koa();

app.use(staticFile);

const router = new Router();
router.get('/hello', home.hello);
router.get('/react', react.count);

app.router = router;

app.listen(9999);
