// http://big-event-api-t.itheima.net
// 注意：每次发送请求时，会先调用该函数，
// 在这个函数中可以拿到我们给ajax请求提供的配置对象
$.ajaxPrefilter(function(options){

    options.url = 'http://big-event-api-t.itheima.net'+options.url

    if(options.url.indexOf('/my/') !== -1){
        options.headers = {  Authorization:localStorage.getItem('token')||''}
    }
    
    options.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})