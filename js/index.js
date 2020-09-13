$(function() {
  // 当文档加载完成才会执行
  /**
   * 根据屏幕宽度的变化决定轮播图片应该展示什么
   * @return {[type]} [description]
   */
  function resize() {
    // 获取屏幕宽度
    var windowWidth = $(window).width();
    // 判断屏幕属于大还是小
    var isSmallScreen = windowWidth < 768;
    // 根据大小为界面上的每一张轮播图设置背景
    // $('#main_ad > .carousel-inner > .item') // 获取到的是一个DOM数组（多个元素）
    $('#main_ad > .carousel-inner > .item').each(function(i, item) {
      // 因为拿到是DOM对象 需要转换
      var $item = $(item);
      // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
      var imgSrc =
        isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

      // jQuery方式
      // $element.data()
      // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
      // 函数的参数是我们要取得属性名称（abc）
      //
      // $element.attr('data-abc')
      //
      // JS中的写法
      // element.dataset['abc']
      //
      // element.getAttribute('data-abc')
      // element.setAttribute('data-abc','')

      // 设置背景图片
      $item.css('backgroundImage', 'url("' + imgSrc + '")');
      //
      // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
      }
    });
    //$('#recommend > .container > .recommend-img').css('width',windowWidth-50);
  }
  // $(window).on('resize', resize);
  // // 让window对象立即触发一下resize
  // $(window).trigger('resize');
  $(window).on('resize', resize).trigger('resize');


  $('#myModal2 .isRegister').click(function() {
    $('#myModal2 .btn').trigger('click');
  });

  $('#myModal1 .isLogin').click(function() {
    $('#myModal1 .btn').trigger('click');
  });
  
  // 给首页 注册点击事件
  $('#header .index').click(function(){ 
    $('#releasePage').hide();
    $('#minePage').hide();
    $('#main_ad').fadeIn();
    $('#recommend').fadeIn();
  });
  // 给动态加载的 我的 按钮 添加点击事件
  $('#header .mine-register').delegate('a.mine','click',function(){
    $('#main_ad').hide();
    $('#recommend').hide();
    $('#releasePage').hide();
    $('#minePage').fadeIn();
  });

  // 给动态加载的 发布 按钮 添加点击事件
  $('#header .release-login').delegate('a.release','click',function(){
    $('#main_ad').hide();
    $('#recommend').hide();
    $('#minePage').hide();
    $('#releasePage').fadeIn();
  });
  //点击登陆按钮执行
  $('#myModal2 .login').click(function(){
    var phone = $('#myModal2 .inputPhone').val();
    var password = $('#myModal2 .inputPassword').val();
    $('#myModal2 .inputPho span').hide();
    $('#myModal2 .inputPass span').hide();
    if( phone.length != 11 ){
      $('#myModal2 .inputPho span').fadeIn();
    }
    if( isNaN(phone) ){
      $('#myModal2 .inputPho span').fadeIn();
    }
    if( password.length < 6 || password.length > 12){
      $('#myModal2 .inputPass span').fadeIn();
    }
    $.ajax({
      url: 'http://47.106.200.29/apis/idle/Login',
      data: {phonenumber: phone,password: password},
      dataType: 'json',
      type: 'post',
      success: function(res){
        //console.log(res.result);
        if( res.result == 'failure' ){
          $('#myModal4 .modal-body p').text(res.msg);
          $('#myModal4').modal();
        }else if( res.result == 'success' ){
          $('#myModal2 .inputPho span').hide();
          $('#myModal2 .inputPass span').hide();
          $('#myModal3 .modal-body p').text(res.msg);
          $('#myModal3').modal();
          $('#myModal2 .btn').trigger('click');
          $('#header .release-login').html('<a href="#" class="release">发布</a>');
          $('#header .mine-register').html('<a href="#" class="mine">我的</a>');
        }
      },
      error: function(res){
        //console.log(res);
        $('#myModal4 .modal-body p').text(res.msg);
        $('#myModal4').modal();
      }
    }) 
  });
  // 点击注册按钮执行
  $('#myModal1 .register').click(function(){
    var phone = $('#myModal1 .inputPhone').val();
    var password = $('#myModal1 .inputPassword').val();
    var againPassword = $('#myModal1 .inputAgainPassword').val();
    $('#myModal1 .inputPho span').hide();
    $('#myModal1 .inputPass span').hide();
    $('#myModal1 .inputAgain span').hide();
    
    if( phone.length != 11 ){
      $('#myModal1 .inputPho span').fadeIn();
    }else if( isNaN(phone) ){
      // 输入 字母  显示格式出错
      $('#myModal1 .inputPho span').fadeIn();
    }else if( password.length < 6 || password.length > 12){
      $('#myModal1 .inputPass span').fadeIn();
    }else if(againPassword != password){
      $('#myModal1 .inputAgain span').fadeIn();
    }
    $.ajax({
      url: 'http://47.106.200.29/apis/idle/Enroll',
      data: {phonenumber: phone,password: password},
      dataType: 'json',
      type: 'post',
      success: function(res){
        console.log(res.msg);
        console.log(res.result);
        if( res.result == 'failure'){
          $('#myModal6 .modal-body p').text(res.msg);
          $('#myModal6').modal();
        }else if( res.result == 'success'){
          if(againPassword == password){
            $('#myModal5 .modal-body p').text(res.msg);
            $('#myModal1 .btn').trigger('click');
            $('#myModal5').modal();
          }else{
            $('#myModal6 .modal-body p').text('两次密码输入不一样');
            $('#myModal6').modal();
          }  
        }     
      },
      error: function(res){
        //console.log(res);
        $('#myModal6 .modal-body p').text(res.msg);
        $('#myModal6').modal();
      }
    })
  }); 

  //给退出登录注册事件
  $('#minePage .myEdit').click(function(){
    $('#releasePage').hide();
    $('#minePage').hide();
    $('#main_ad').fadeIn();
    $('#recommend').fadeIn();
    $('#header .release-login').html('<a href="#" data-toggle="modal" data-target="#myModal2" class="login">登录</a>');
    $('#header .mine-register').html('<a href="#" data-toggle="modal" data-target="#myModal1" class="register">注册</a>');
  });
  
  // 发布 页面 左侧导航栏点击事件
  $('#releasePage .leftItem li').click(function(){
    $(this).addClass('myActive').siblings().removeClass('myActive');
    $('#releasePage .middle').hide();
    $('#releasePage .right').hide();
    $($(this).attr("value")).fadeIn();
  });
  

  //我的 页面 左侧导航栏 点击事件
  $('#category_04 .leftNav li').click(function(){
    $(this).addClass('myActive').siblings().removeClass('myActive');
    $('#category_04 .loading').children().hide();
    $($(this).attr("value")).fadeIn();
  });
  $('#category_05 .leftNav li').click(function(){
    $(this).addClass('myActive').siblings().removeClass('myActive');
    $('#category_05 .loading').children().hide();
    $($(this).attr("value")).fadeIn();
  });
  
  // 点击上传图片 这行文字 调用 input:file 按钮
  $('#releasePage .right .uploadImg').click(function(){
    $('#uploadFile').trigger('click');
  });

});
