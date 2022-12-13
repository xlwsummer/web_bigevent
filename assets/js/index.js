
$(function(){
  
    getUser()

    let layer = layui.layer

    //点击退出
    $('#btnLogout').on('click',function(e){
        layer.confirm('确定退出登录？',{icon:3,title:'提示'},(index)=>{
            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index)
        })
        
    })
})


function getUser(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||'',
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }

            //渲染用户的头像
            renderAvatar(res.data)
        }

        // 无论请求是否成功都会执行
        // complete:function(res){
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })
}


/* 
   renderAvatar：渲染用户的头像
   user:服务器返回的用户信息
*/
function  renderAvatar(user){

    const name = user.nickname || user.username

    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)

    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()

        const first = name[0].toUpperCase()
        console.log(first)
        $('.text-avatar').html(first).show()
    }
}


