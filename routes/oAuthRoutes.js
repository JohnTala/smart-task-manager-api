const router=require('express').Router()
const passport=require('passport');

router.get('/',(req,res)=>{
    // res.setHeader('content-type','text/html')
    // res.send('<h2>Welcome to Homepage - Oauth2.0</h2>')
    res.render('home',{user:req.user})
})

router.get('/login',(req,res)=>{
    res.render('login',{user:req.user})
})

router.get('/google',passport.authenticate('google',{
    scope:['profile']
})
)
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err); // handle error properly
        res.redirect('/auth');         // redirect **after logout is complete**
    });
});


//redirect to callback function and exchange code with profile information
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile')
})

module.exports=router;