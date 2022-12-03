const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Users"');
        return rs;
    },
    getByUsername: async(data)=> {
        const rs=db.any('SELECT * FROM "Users" WHERE "Username"=$1', [data.username]);
        return rs;
    },
    add: async(data)=>{
        const rs=await db.one('INSERT INTO "Users"("Username","Password","Name","Email","DOB") VALUES($1, $2, $3, $4, $5) RETURNING *', [data.username, data.password, data.name, data.email, data.dob]);
        return rs;
    }
}