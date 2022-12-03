const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Movies"');
        return rs;
    },
    getByID: async(data)=> {
        const rs=db.any('SELECT * FROM "Movies" WHERE "id"=$1', [data]);
        return rs;
    },
    add: async(data)=>{
        const rs=await db.one('INSERT INTO "Movies"("id","img","title","year","topRank","rating","ratingCount","synopses") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
        [data.id, data.img, data.title, data.year, data.topRank, data.rating, data.ratingCount, data.synopses]);
        return rs;
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "Movies"');
    }
}