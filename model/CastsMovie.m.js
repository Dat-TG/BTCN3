const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "CastsMovie"');
        return rs;
    },
    getByID: async(IDM)=> {
        const rs=db.any('SELECT * FROM "CastsMovie" WHERE "idMovie"=$1', [IDM]);
        return rs;
    },
    add: async(data)=>{
        const rs=await db.one('INSERT INTO "CastsMovie"("idMovie","id","name","characters") VALUES($1, $2, $3, $4) RETURNING *', 
        [data.idMovie, data.id, data.name, data.characters]);
        return rs;
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "CastsMovie"');
    }
}