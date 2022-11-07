const PooL=require('pg').Pool
const POOL=new PooL({
    user:'postgres',
    host:'localhost',
    password:'lmvit123',
    database:'file_upload'
})
module.exports=POOL