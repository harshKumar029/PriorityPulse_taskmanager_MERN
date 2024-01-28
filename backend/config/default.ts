require('dotenv').config();
const mongodburl = process.env.mongodburl
const port = process.env.port;
const host = process.env.host;
const saltWorkFactor = process.env.saltWorkFactor;

module.exports = {
    mongodburl,
    port,
    host,
    saltWorkFactor
};
