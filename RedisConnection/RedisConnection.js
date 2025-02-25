 const redis = require('ioredis')
 
 const RedisManager = new redis.Redis(
       'rediss://default:AVNS_0WDCTxpoCRCt-oTO-e_@caching-8d0912f-testtust21-e578.h.aivencloud.com:11860'
 )
module.exports= RedisManager;

