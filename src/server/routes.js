const authController = require('./controllers/auth');
const stellarController = require('./controllers/stellar');
const Router = require('express').Router;
const cors = require('cors');

const router = new Router();

router.get('/api/health-check', (req, res) => {
  res.send('ok');
});

router.post('/api/signup', authController.signup );
router.post('/api/login', authController.login );
router.get('/api/session', authController.session );
router.get('/api/logout', authController.logout );
// /api/verify?fortnite_username=<username>
router.get('/api/verify', authController.verify );

router.use(cors());
router.get('/.well-known/stellar.toml', stellarController.stellarToml);
// /api/federation?q=<username>*bbuck.io&type=name
router.get('/api/federation', stellarController.federation);

module.exports = router;
