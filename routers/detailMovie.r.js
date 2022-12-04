const app=require('express');
const router=app.Router();
const detailMovieC=require('../controllers/detailMovie.c');
router.use('/:id/addToFavorite',detailMovieC.addFav).post(detailMovieC.addFav);
router.use('/:id', detailMovieC.render).post(detailMovieC.render);
module.exports=router;