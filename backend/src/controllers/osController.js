const os = require("os");
const path = require("path");
const fs = require("fs");

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Байтов', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${days} дн ${hours} ч ${minutes} мин ${seconds} сек`;
}

async function getOsInfo(req, res, next) {
    try{
        const osInfo = {
            platform: os.platform(),
            cpuArch: os.arch(),
            cpuCores: os.cpus().length,
            freeMemory: formatBytes(os.freemem()),
            totalMemory: formatBytes(os.totalmem()),
            uptime: formatUptime(os.uptime()),
        };
        res.json(osInfo);
    } catch (err){
        next(err)
    }
}

async function getFile(req, res, next) {
    try{
        const filePath = './hello.txt'

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return next(err);
            const fileData = {
                text: data
            };
            res.json(fileData);
        });
    } catch (err){
        next(err);
    }

}

module.exports = {
    getOsInfo,
    getFile,
};