const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async(Username,ListName)=>{
        const rs=await db.any('SELECT * FROM "FavMovie" WHERE "Username"=$1 AND "Listname"=$2',[Username, ListName]);
        return rs;
    },
    add: async(Username, ListName, idMovie)=>{
        const rs=await db.one('INSERT INTO "FavMovie"("Username","Listname","idMovie") VALUES($1, $2, $3) RETURNING *', 
        [Username, ListName, idMovie]);
        return rs;
    },
    delete: async(Username, ListName, idMovie)=>{
        const rs=await db.none('DELETE FROM "FavMovie" WHERE "Username"=$1 AND "Listname"=$2 AND "idMovie"=$3',[Username,ListName,idMovie]);
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "FavMovie"');
    },
    getByID: async(Username, ListName, idMovie) => {
        const rs=await db.any('SELECT * FROM "FavMovie" WHERE "Username"=$1 AND "Listname"=$2 AND "idMovie"=$3',[Username, ListName, idMovie]);
        return rs;
    }
}