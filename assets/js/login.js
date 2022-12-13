// const { post } = require('jQuery')

/*
    这是login界面的js
    summer
    2022.12.13
*/
// require('jQuery')
$(function(){
    
    //点击‘去注册账号’的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击‘去登录’的链接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form对象
    const form = layui.form

    // 通过form.verify()函数自定义校验规则

    form.verify({
        // 自定义了一个叫pwd 校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()

            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()

        const data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}

        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:data,
            success:function(res){
                if(res.status !== 0) return layer.msg(res.message)

                layer.msg('注册成功，请登录')

                // .click 已弃用
                $('#link_login').click()
            }
        })
    })


    // 监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()

       
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) return layer.msg(res.message)

                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                
                // 跳转到后台主页
                location.href = '/index.html'
               
            }
        })
    })

})



// token
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDE2NywidXNlcm5hbWUiOiJzdW1tZXIiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY3MDkwNDA4MywiZXhwIjoxNjcwOTQwMDgzfQ.cf7jZEy4lMukr_M4FjObowCodjnD6FLL8BwFs0OQlYo