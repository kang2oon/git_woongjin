/*
@khy hwayoung.kim83@gmail.com
 */

$(document).ready(function(){

if($('#content-wrap').find('.gnb-navi').length){
        initGnb();
    }

    function initGnb(){
    
        $('.gnb-navi').children().bind({
            'mouseenter focusin' : function(){ 
                if($(this).hasClass('active')) return false;
                if($(this).hasClass('over')) return false;
    
                $(this).addClass('over');
                var source = $(this).find('img').attr('src').replace('.png','_.png');
                $(this).find('img').attr('src',source);
            }
        });
    
        $('.gnb-navi').children().bind('mouseleave focusout',function(e){ 
    
            if($(this).hasClass('active')) return false;
    
            $(this).removeClass('over');
            var source = $(this).find('img').attr('src').replace('_.png','.png');
            $(this).find('img').attr('src',source);
            
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
    
    var $tab01 = $('#tabSwitch');
    var $tab02 = $('#tabSwitch02');
    var $target = $('#sub-content').find('.tab-view');
    var $target2 = $('#sub-content').find('.d-tab-view');
    
    $tab01.find('a').on('click',function(){
        var idx=$(this).parent().index();
        
        $tab01.children().removeClass('sel').eq(idx).addClass('sel');
        
        $target.hide();
        $target.eq(idx).show();
        
        if($tab02.find('a').on('click',function(){
             var idx2=$(this).parent().index();
             
             $tab02.children().removeClass('sel').eq(idx2).addClass('sel');
                
                $target2.hide();
                $target2.eq(idx2).show();
                return false;
            }
        ));
        
        if($tab01.children().last().hasClass('sel')){
            
            $tab02.children().removeClass('sel').eq(0).addClass('sel')
            $target2.hide();
            $target2.eq(0).show();
        }

    });  

}
