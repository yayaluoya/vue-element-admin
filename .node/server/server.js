const express = require('express');
const { ResData } = require('./ResData');

const app = express()
const port = 1235;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS')
        res.sendStatus(200); //让options尝试请求快速结束
    else
        next();
});

app.get('/test', (req, res) => {
    setTimeout(() => {
        res.send(new ResData(req.query));
    }, 500);
})
app.post('/test', (req, res) => {
    setTimeout(() => {
        res.send(new ResData(req.body));
    }, 500);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

module.express = {
    port,
};