const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async(Username)=>{
        const rs=await db.any('SELECT * FROM "FavList" WHERE "Username"=$1',[Username]);
        return rs;
    },
    add: async(Username, ListName)=>{
        const rs=await db.one('INSERT INTO "FavList"("Username","Listname") VALUES($1, $2) RETURNING *', 
        [Username, ListName]);
        return rs;
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "FavList"');
    }
}