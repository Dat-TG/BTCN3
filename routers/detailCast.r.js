const app=require('express');
const router=app.Router();
const detailCastC=require('../controllers/detailCast.c');
router.use('/:id', detailCastC.render).post(detailCastC.render);
module.exports=router;