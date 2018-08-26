const authController = require('./controllers/auth');
const Router = require('express').Router;

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

module.exports = router;
