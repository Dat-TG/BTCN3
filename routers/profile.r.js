const app=require('express');
const router=app.Router();
const profileC=require('../controllers/profile.c');
const FavC=require('../controllers/FavList.c');
router.post('/:old/rename',FavC.rename).post(FavC.rename);
router.post('/addList',FavC.add);
router.use('/', profileC.render);
module.exports=router;