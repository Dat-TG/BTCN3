const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Genres"');
        return rs;
    },
    getByIdMovie: async(IDM)=> {
        const rs=db.any('SELECT * FROM "Genres" WHERE "idMovie"=$1', [IDM]);
        return rs;
    },
    add: async(data)=>{
        const rs=await db.one('INSERT INTO "Genres"("idMovie","genres") VALUES($1, $2) RETURNING *', 
        [data.idMovie, data.genres]);
        return rs;
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "Genres"');
    }
}