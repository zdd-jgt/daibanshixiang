var app = angular.module("icloud", []);
app.directive('myUl', [function() {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<div class="jcL_nav"><div ng-transclude></div></div>',
        link: function($scope, el) {
            $(el).on('click', ".liebiao", function() {
                $(document).on("keyup", ":input", false)
                $(el).on("keyup", false);
                var liebiao = $(el).find(".liebiao");
                var index = $(this).index();
                liebiao.removeClass("liebiao_active");
                $(this).addClass("liebiao_active");
                liebiao.find('.liebiao1_top').css('display', 'none');
                $(this).find('.liebiao1_top').css("display", "block");
                liebiao.find('.liebiao1_bottom').css("left", 44)
                $(this).find('.liebiao1_bottom').css("left", 0);
                liebiao.find(".title").removeClass("title_active");
                $(this).find(".title").addClass("title_active")
                $(".icL_yijihua").removeClass("yijihua_active");
                var that = this;
                $scope.$apply(function() {
                    $scope.cu = $(that).index();
                })
            });
            $(".icL_yijihua").on('click', function() {
                $(el).find(".liebiao").removeClass("liebiao_active");
                $(this).toggleClass("yijihua_active");
            })

            $(document).on('keyup', function(e) {
                if(e.keyCode === 8) {
                    var index = $('.liebiao_active').index();
                    if(index === -1) {
                        return;
                    }
                    $scope.$apply(function() {
                        if($scope.lists.length == 1) {
                            return;
                        } else {
                            $scope.lists.splice(index, 1);
                            $scope.save2local();
                        }
                    })
                }
            });
        }
    }
}]);
app.directive('myShow', [function(){
    return{
        restrict:"A",
        replace:true,
        template:'<div class="icR_xia_head_R"><div class="icR_xia_head_R_xuze {{lists[cu].theme}}">选项</div></div>',
        link:function($scope,el){
            $(el).on('click',function(){
                $(".selectorShow").toggleClass("selectorShow_active")
            })
        }
    }
}]);
app.directive('myColor', [function(){
    return{
        restrict:"A",
        replace:true,
        transclude:true,
        template:'<ul><div ng-transclude></div></ul>',
        link:function($scope,el){
            $(el).on('click','li',function(){
                var index=$(this).index();
                var li= $(el).find("li");
                for(var i=0;i<li.length;i++){
                    li.removeClass($scope.color1[i]);
                }
                $(this).addClass($scope.color1[index]);
            })
        }
    }
}]);
app.directive('ngXinzeng', [function(){
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<div class="icR_xia_bottom_neirong_xin"><div ng-transclude></div></div>',
        link: function($scope, el) {
            $(el).on("click",".wancheng_L",function(){
                var top=52;
                $(".icR_xia_bottom_neirong_body1 .icR_xia_bottom_neirong_ywc1").addClass("ywc_active");
                $(".icR_xia_bottom_neirong_xin").css("top",top);
                $(".icR_xia_bottom_neirong_body1 .icR_xia_b_nr_ywc_top").addClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body1 .icR_xia_b_nr_ywc_bottom").addClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body1 .icR_xia_b_nr_ywc_back").addClass("icR_xia_b_nr_ywc_tb_active");
                $('.icR_xia_bottom_neirong_wancheng .icR_xia_bottom_xian1').css("display","none");
                $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_top").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_bottom").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_back").removeClass("icR_xia_b_nr_ywc_tb_active");
                return false;
            })
            $(document).on("click", ":input", false)
            function max1Id() {
                var max = -Infinity;
                var len = $scope.lists[$scope.cu].todos.length;
                for(var i = 0; i < len; i++) {
                    var v = $scope.lists[$scope.cu].todos[i];
                    if(v.id > max) {
                        max = v.id;
                    }
                }
                return(max === -Infinity) ? 0 : max;
            }
            $(document).on("click",function(){
                $(".icR_xia_bottom_neirong_xin").css("top",0);
                var value=$(".icR_xia_bottom_neirong_body1 .no_finish").val();
                if(value!==""){
                    $scope.lists[$scope.cu].todos.push({id:max1Id()+1,name:value,state:0});
                    
                }else if(value==""){
                    $(".icR_xia_bottom_neirong_body1 .icR_xia_bottom_neirong_ywc1").removeClass("ywc_active");
                }
                $(".icR_xia_bottom_neirong_body1 .no_finish").val("");
                $(".icR_xia_bottom_neirong_body1 .icR_xia_bottom_neirong_ywc1").removeClass("ywc_active");
                $scope.$apply(function() {
                    $scope.save2local();
                })
            })
        }
    }
}]);
app.directive('ngWeiwancheng', [function(){
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<div class="icR_xia_bottom_neirong_body"><div ng-transclude></div></div>',
        link: function($scope, el) {
            $(el).on("click",".icR_xia_bottom_neirong_ywc",function(){
                var index=$(this).index(); 
//              var weia=[];
//              $scope.lists[$scope.cu].todos.forEach(function(v,i){
//                  if(v.state==0){
//                      weia.push(v.id)
//                  }
//              })
                
                $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_top").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_bottom").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_back").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".nei_Rxianqing").css("display","none");
                    $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_top").eq(index).addClass("icR_xia_b_nr_ywc_tb_active");
                    $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_bottom").eq(index).addClass("icR_xia_b_nr_ywc_tb_active");
                    $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_back").eq(index).addClass("icR_xia_b_nr_ywc_tb_active");
                    $(".nei_Rxianqing").eq(index).css("display","block");
                
                    
                
                return false;
            })
            $(el).on("click",".nei_Ldian",function(){
                console.log(1)
                $(".wancheng_R").css("display","block");
            })
            
        }
    }
}]);
app.directive('ngWancheng', [function(){
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<div class="icR_xia_bottom_neirong_body2"><div ng-transclude></div></div>',
        link: function($scope, el) {
            $(el).on("click",".icR_xia_bottom_neirong_ywc2",function(){
                var index=$(this).index(); 
//              var wana=[];
//              $scope.lists[$scope.cu].todos.forEach(function(v,i){
//                  if(v.state==1){
//                      wana.push(v)
//                  }
//              })
                $(".icR_xia_bottom_neirong_body2 .icR_xia_b_nr_ywc_top").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body2 .icR_xia_b_nr_ywc_bottom").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".icR_xia_bottom_neirong_body2 .icR_xia_b_nr_ywc_back").removeClass("icR_xia_b_nr_ywc_tb_active");
                $(".nei_Rxianqing").css("display","none");
                
                    $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_top").eq(index).addClass("icR_xia_b_nr_ywc_tb_active");
                    $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_bottom").eq(index).addClass("icR_xia_b_nr_ywc_tb_active");
                    $(".icR_xia_bottom_neirong_body .icR_xia_b_nr_ywc_back").eq(index).addClass("icR_xia_b_nr_ywc_tb_active");
                    $(".nei_Rxianqing").eq(index).css("display","block");
                
                return false;
            })
            var date=new Date();
            $('.shijian').html(date.getFullYear()+ '年' +(date.getMonth()+1)+ '月' +date.getDate()+ '日' +'星期' +date.getDay())
            console.log(date.getFullYear(),(date.getMonth()+1),date.getDate(),date.getDay() ) 
        }
    }
}]);
app.directive('dianjiWancheng', [function(){
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<div class="icR_xia_bottom_neirong_wancheng"><div ng-transclude></div></div>',
        link: function($scope, el) {
            $(el).on("click",".wancheng_R",function(){
                $(".icR_xia_bottom_neirong_body2").toggleClass("icR_xia_bottom_neirong_body2_active");
                $(".icR_xia_bottom_neirong_wancheng .wancheng_R_Limg").toggleClass("wancheng_R_Limg_active");
                $(".icR_xia_bottom_neirong_wancheng .wancheng_R_R_zi").toggleClass("wancheng_R_R_zi_active");
                $('.icR_xia_bottom_neirong_wancheng .icR_xia_bottom_xian1').toggleClass("icR_xia_bottom_xian1_active");
            })
//          
        }
    }
}]);
app.controller("icloudCtrl", ['$scope', function($scope) {
    var dian = $(".lie_dian");
    $scope.color = ["purple", "green", "blue", "yellow", "brown", "pink", "orange"];
    $scope.color1 = ["purple1", "green1", "blue1", "yellow1", "brown1", "pink1", "orange1"];
    $scope.color2 = ["purple2", "green2", "blue2", "yellow2", "brown2", "pink2", "orange2"];
    $scope.color3 = ["purple3", "green3", "blue3", "yellow3", "brown3", "pink3", "orange3"];
    $scope.cu = 0;
    if(localStorage.reminder) {
        $scope.lists = JSON.parse(localStorage.reminder);
    } else {
        $scope.lists = [];
    }
    $scope.save2local = function() {

        localStorage.reminder = JSON.stringify($scope.lists);
    };

    
    //删除
    $scope.del=function(){
        var index = $('.liebiao_active').index();
        if(index === -1) {
            return;
        }
        if($scope.lists.length == 1) {
            return;
        } else {
            $scope.lists.splice(index, 1);
            $scope.save2local();
        }
        $(".selectorShow").removeClass("selectorShow_active");
    }
    //取消
    $scope.back=function(){
        
        console.log(value)
        $(".selectorShow").removeClass("selectorShow_active");
       
    }
    //完成
    $scope.over=function(){
         $(".selectorShow").removeClass("selectorShow_active");
    }
        //添加
    function maxId() {
        var max = -Infinity;
        var len = $scope.lists.length;
        for(var i = 0; i < len; i++) {
            var v = $scope.lists[i];
            if(v.id > max) {
                max = v.id;
            }
        }
        return(max === -Infinity) ? 1000 : max;
    }
    
    $scope.addList = function() {
        var len = $scope.lists.length;
        var index = len % 7;
        var v = {
            id: maxId() + 1,
            name: "新列表" + (len + 1),
            theme: $scope.color[index],
            date:$(".shijian").text(),
            todos:[]
        };
        
        $scope.lists.push(v);
    }
    //新增
    $scope.count=function(){
        var r=0;
        $scope.lists[$scope.cu].todos.forEach(function(v,i){
            if(v.state===1){
                r++;
            }
        })
        return r;
    };
    //tan取消
    $scope.tanQuxiao=function(){
        $(".tan").removeClass("tan_active");
    }
    //tan 删除
    $scope.tanShanchu=function(){
        $(".icR_xia_bottom_neirong_body2").removeClass("icR_xia_bottom_neirong_body2_active");
        $(".icR_xia_bottom_neirong_wancheng .wancheng_R_Limg").removeClass("wancheng_R_Limg_active");
        $(".icR_xia_bottom_neirong_wancheng .wancheng_R_R_zi").removeClass("wancheng_R_R_zi_active");
        $('.icR_xia_bottom_neirong_wancheng .icR_xia_bottom_xian1').removeClass("icR_xia_bottom_xian1_active");
        $(".tan").removeClass("tan_active");
//      console.log($scope.lists[$scope.cu].todos.state);
        var newarr=[];
        $scope.lists[$scope.cu].todos.forEach(function(v,i){
            if(v.state===0){
                newarr.push(v);
            }
        })
        $scope.lists[$scope.cu].todos=newarr;
    }
    //tan 出
    $scope.tan=function(){
        $(".tan").addClass("tan_active");
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}])