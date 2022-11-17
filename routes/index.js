var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn) {
    console.log('1');
    res.redirect('/home')
  } else {
    console.log('2');
    res.render('login')
  }

});

router.get('/home', function(req, res, next) {
  if (req.session.loggedIn) {
    console.log('3');
    res.render('home',{user:req.session.email});

  } else {
    console.log('4');
    res.redirect('/')
  }
});

const data={
   email:"masoo@gmail.com",
   password:"123"
}
router.post('/',(req,res)=>{
  const email=req.body.email
  const password=req.body.password
  if(email===data.email && password===data.password){
    req.session.email=email
    console.log('5');
    req.session.loggedIn=true
  res.redirect("/home")
}else{
  console.log('6');
  res.redirect("/")
}
})

router.post('/logout',(req,res)=>{
  console.log('7');
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
