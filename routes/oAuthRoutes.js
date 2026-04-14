const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// redirect to callback function and exchange code with profile information
router.get(
    '/google/redirect',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

module.exports = router;
