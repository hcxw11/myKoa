const App = require('./server/application');
const Router = require('./server/router');
const home = require('./server/controller/home');
const react = require('./server/controller/react');
const staticFile = require('./server/middleware/staticFile');

const app = new App();

app.use(staticFile);

const router = new Router();
router.get('/hello', home.hello);
router.get('/react', react.count);

app.router = router;

app.listen(9999);
