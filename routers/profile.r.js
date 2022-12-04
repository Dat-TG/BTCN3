const app=require('express');
const router=app.Router();
const profileC=require('../controllers/profile.c');
const FavC=require('../controllers/addList.c');
router.post('/addList',FavC.add);
router.use('/', profileC.render);
module.exports=router;