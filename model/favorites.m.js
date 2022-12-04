const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async(Username)=>{
        const rs=await db.any('SELECT * FROM "Favorites" INNER JOIN "Movies" ON "idMovie"="id" WHERE "Username"=$1',[Username]);
        return rs;
    },
    getByID: async(data)=> {
        const rs=db.any('SELECT * FROM "Favorites" WHERE "id"=$1', [data]);
        return rs;
    },
    add: async(idMovie, Username)=>{
        const rs=await db.one('INSERT INTO "Favorites"("idMovie","Username") VALUES($1, $2) RETURNING *', 
        [idMovie, Username]);
        return rs;
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "Favorites"');
    },
    getTopRating: async(Username)=>{
        const rs=await db.any('SELECT * FROM "Favorites" INNER JOIN "Movies" ON "idMovie"="id" WHERE "Username"=$1 ORDER BY "rating" DESC NULLS LAST',[Username]);
        return rs;
    }
}