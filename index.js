//无缝轮播
$main=(function(){
    var $box=$('<div class="box" id="box"></div>')
    var $slider=$('<div class="slider" id="slider"></div>');
    var $left=$('<span id="left"><</span>');
    var $right=$('<span id="right">></span>');
    var $navs=$('<ul class="nav" id="navs"></ul>');
    var imageurl=["./img/b5.png","./img/b1.png","./img/b2.png","./img/b3.png","./img/b4.png","./img/b5.png","./img/b1.png"];
    $('#box').append($slider).append($left).append($right).append($navs);
    //添加图片
    for(var i=0;i<imageurl.length;i++){
        var $slide='<div class="slide"><image src="'+imageurl[i]+'"alt=""></div>';
        $('#slider').append($slide);
    }
    //添加li
    
    for (var i = 0; i < 5; i++) {
        var $li = $("<li>" + (i + 1) + "</li>");
        if (i == 0) {
            $($li[i]).addClass("active");
        }
        $("#navs").append($li);
    }
    var $nav = $('#navs').children()
    
    
   
    var timer;
    var isMoving = false;
    var index=0;//当前图片索引
    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    }
    function animate(obj, json, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var attr in json) {
                (function (attr) {
                    if (attr == "opacity") {
                        var now = parseInt(getStyle(obj, attr) * 100);
                        var dest = json[attr] * 100;
                    } else {
                        var now = parseInt(getStyle(obj, attr));
                        var dest = json[attr];
                    }
                    var speed = (dest - now) / 6;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (now != dest) {
                        flag = false;
                        if (attr == "opacity") {
                            obj.style[attr] = (now + speed) / 100;
                        } else {
                            obj.style[attr] = now + speed + "px";
                        }
                    }
                })(attr);
            }
            if (flag) {
                clearInterval(obj.timer);
                callback && callback(); //如果回调函数存在，就调用回调函数
            }
        }, 30);
    }
    $left.css({opacity:0.8});
    $right.css({opacity:0.8});
    $box.mouseout(function(){
        setInterval(timer);
        $left.css({opacity:0});
        $right.css({opacity:0});
    })
    
    //下一张
    function next(){
        if (isMoving) {
            return;
        }
        isMoving = true;
        index++;//向右滑动，图片索引增加
        navmove();//图片按钮样式跟着改变
        animate(slider, {
            left: -1200 * index
        }, function () {
            if (index ==6) {
                $('#slider').style.left = '-1200px';
                index = 1;
            }
            isMoving = false;
        });

    }
   
    // 上一张
    function prev(){
        if (isMoving) {
            return;
        }
        isMoving = true;
        index--;
        navmove();
        animate(slider, {
            left: -1200 * index
        }, function () {
            if (index == 0) {
                slider.style.left = '-6000px';
                index = 5;
            }
            isMoving = false;
        });
    }
    //按钮点击切换事件
    for (var i=0;i<5; i++) {
        $($nav[i]).index = i;
        $($nav[i]).onclick = function () {
            index=$($nav[i]).index + 1;
            navmove();
            animate(slider, {
                left:-1200*index
            });
    }

    }
    // 图片切换时，按钮样式跟着改变
    function navmove(){
        for(var i=0;i<5;i++){
          $($nav[i]).removeClass('active'); 
          $($nav[index]).addClass('active');
        }
       $($nav[index-1]).addClass=("active");
        
    }    
    right.onclick = next;
    left.onclick = prev;
    timer = setInterval(next,1000);
    return {
        show: show
    };
}());



