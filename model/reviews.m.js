const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Reviews"');
        return rs;
    },
    getByIdAuthor: async(id,au)=> {
        const rs=db.any('SELECT * FROM "Reviews" WHERE "idMovie"=$1 AND "author"=$2', [id,au]);
        return rs;
    },
    add: async(data)=>{
        const rs=await db.one('INSERT INTO "Reviews"("idMovie","author","authorRating","helpfulnessScore","up","down","languageCode","reviewText","reviewTitle","submissionDate") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
        [data.idMovie, data.author, data.authorRating, data.helpfulnessScore, data.up, data.down, data.languageCode, data.reviewText, data.reviewTitle,data.submissionDate]);
        return rs;
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "Reviews"');
    }
}