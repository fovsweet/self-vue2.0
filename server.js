var express = require('express')
var path = require('path')
var proxy = require('http-proxy-middleware')

var app = express();

//设置端口号
app.set('port', process.env.PORT || 4000);

//设置解析文件的模板引擎
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//设置静态资源的路径
app.use(express.static(__dirname + '/views'))

//设置模板文件的路径
app.set('views', path.join(__dirname, 'views'));

//设置服务器代理
app.use(process.env.CONTEXT,proxy({
    target: process.env.TARGET,
    logLevel: 'debug',
    changeOrigin:true,
    headers:{
        cookie:process.env.COOKIE
    }
}))

//启动服务
app.listen(app.get('port'), function() {
    console.log('Express app listening on port ' + app.get('port'))
});
