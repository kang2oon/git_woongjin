/*
@khy hwayoung.kim83@gmail.com
 */

$(document).ready(function(){
    /*
        var $list = $('.area-banner2').find('ul.list-app');
        var $prev = $('.area-banner2').find('a.prev');
        var $next = $('.area-banner2').find('a.next');
        var size = $list.children().outerWidth();
        var len =  $list.children().length;
        var cnt = 0;
        var width = $list.css('width',len*size);
        
        $next.bind('click',function(){
            if(cnt>=len) return false;
             cnt++;
             $list.animate({'left':- (cnt*size)+'px'},'normal');
            
            return false;
        });
        
        $prev.bind('click',function(){
            if(cnt==0) return false;
            cnt--;
            $list.animate({'left':- (cnt*size)+'px'},'normal');
            
            return false;
        });
    */

if($('#content-wrap').find('.gnb-navi').length){
        initGnb();
    }

function initGnb(){
    
    $('.gnb-navi').children().find('img').bind('mouseenter focusin',function(e){ 

        $('.gnb-navi').children().find('img').each(function(){
            var source = $(this).attr('src').replace('_.png','.png');
            $(this).attr('src',source);
        });

        var source = $(this).attr('src').replace('.png','_.png');
        $(this).attr('src',source);
        
    });

    $('.gnb-navi').children().find('img').bind('mouseleave',function(e){
        $('.gnb-navi').children().find('img').each(function(){
            var source = $(this).attr('src').replace('_.png','.png');
            $(this).attr('src',source);
        });
    });
}


});



function fn_rollToEx(containerID, slideID) {

    var el = $('#' + containerID).find('#' + slideID);
    var lastChild;
    var speed = 3000;
    var timer = 0;

    el.data('prev', $('#' + containerID).find('.prev'));
    el.data('next', $('#' + containerID).find('.next'));
    el.data('size', el.children().outerWidth());
    el.data('len', el.children().length);
    el.data('animating', false);

    el.css('width', el.data('size') * el.data('len'));

    el.data('prev').bind({
        click: function (e) {
            e.preventDefault();
            movePrevSlide();
        }
    });

    el.data('next').bind({
        click: function (e) {
            e.preventDefault();
            moveNextSlide();
        }
    });

    function movePrevSlide() {
        if (!el.data('animating')) {
            var lastItem = el.children().eq(-2).nextAll().clone(true);
            lastItem.prependTo(el);
            el.children().eq(-2).nextAll().remove();
            el.css('left', '-' + (el.data('size') * 1 + 'px'));

            el.data('animating', true);

            el.animate({
                'left': '0px'
            }, 'normal', function () {
                el.data('animating', false);
            });
        }
        return false;
    }

    function moveNextSlide() {
        if (!el.data('animating')) {
            el.data('animating', true);

            el.animate({
                'left': '-' + (el.data('size') * 1) + 'px'
            }, 'normal', function () {
                var firstChild = el.children().filter(':lt(' + 1 + ')').clone(true);
                firstChild.appendTo(el);
                el.children().filter(':lt(' + 1 + ')').remove();
                el.css('left', '0px');

                el.data('animating', false);

            });
            return false;
        }


    }

}

function tabSwitch(container, tab){
    var $container = $(container);
    var $tab = $container.find(tab);
    var $target = $container.find('.tab-view');
    var $target2 = $container.find('.tab-area1');

    //$target.eq(2).hide();
    
    $tab.children().find('a').bind('click',function(){
        var idx = $tab.children().find('a').index(this);
        var el = $(this).attr('href');
/*
        if($(this).parent().hasClass('sel')){
             $(this).parent().removeClass('sel');
            return false;
        }
       $(this).parent().addClass('sel');
       */
        $target.hide();
        $target.eq(idx).show();

        /*$target2.hide();
        $target2.eq(idx).show();*/
        return false;
    
    });

}

