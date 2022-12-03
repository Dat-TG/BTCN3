const app=require('express');
const router=app.Router();
const importC=require('../controllers/import.c');
router.post('/', importC.import);
module.exports=router;