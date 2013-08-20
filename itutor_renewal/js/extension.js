/* ----------------------------------------------------------------------------------------------- 
 *	2dea.Com Publishing.Div
 * Author	: 2009-12-18 by 2dea
 * Descript	: 2dea Extra-Template Script
 * Edit+	: 2010-09-07 by 2dea
 ----------------------------------------------------------------------------------------------- */

function getUrl(uri) {
    return window.location.href=uri;
}

jQuery(function(){
    var $ = jQuery;

    $('body')
        .removeClass("noscript")
        .addClass(function(){
           $(this).find('[lang="ko"], [lang="ko-kr"]').addClass("lang-ko")
            .end().find('[lang="en"], [lang="en-us"]').addClass("lang-en")
            .end().find('[lang="zh"]').addClass("lang-zh")
            .end().find('[lang="ja"]').addClass("lang-ja");
        });

    $('h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child').addClass("first-child");

    $('div.section:first-child, section:first-child, p:first-child').addClass("first-child");

    $('ul, ol').addClass(function(){
     $(this).not($(this).closest('li ul, li ol')).addClass("depth1 item-size" + $(this).find('>li').size())
            .find('>li, >li>a, >li>a>img').addClass("depth1")
            .find('>ul, >ol').addClass("depth2").find('>li, >li>a, >li>a>img').addClass("depth2")
            .find('>ul, >ol').addClass("depth3").find('>li, >li>a, >li>a>img').addClass("depth3")
            .find('>ul, >ol').addClass("depth4").find('>li, >li>a, >li>a>img').addClass("depth4");
        if(! $(this).find('>li').children().is('ul, ol')) $(this).find('>li').addClass("no-depth");

       $(this).find('>li:first-child:not(:only-child)').addClass("first-child")
        .end().find('>li:last-child').addClass(($(this).find('>li').length <= 1) ? "only-child" : "last-item")
        .end().find('>li:nth-child(even)').addClass("even-item");

        $(this).find('>li').hover(function(){$(this).toggleClass("hover");});
    });

    $('ol').addClass(function(){
        $(this).find('>li').addClass(function(index){
            var i = parseInt(index)+1;

            return "list-item" + i;
        });
    });

    $('dl').addClass(function(){
        $(this).find('>dt:first').addClass("first-term")
         .end().find('>dd:first').addClass("first-desc")
         .end().find('>dd:last').addClass("last-desc");
    });

    $('table').addClass(function(){
        $(this).filter(':has(colgroup)')
        .find('>thead, >tfoot, >tbody')
            .filter('tbody').addClass(function(index){
                var i = parseInt(index)+1;

                return "row-group" + i;
            })
            .end().addClass(function(){
                $(this).find('>tr:first-child').addClass("first-row")
                 .end().find('>tr:nth-child(2)').addClass("second-row")
                 .end().find('>tr:last-child').addClass("last-row")
                 .end().find('>tr:odd').addClass("even-row")
                 .end().find('>tr>th:first-child, >tr>td:first-child').addClass("first-cell")
                 .end().find('>tr>th:last-child, >tr>td:last-child').addClass("last-cell");
                $(this).find('>tr').hover(function(){$(this).toggleClass("hover");});
            })
        ;
    });

    $('input').filter(':text, :password').addClass("txt-type")
        .end().filter(':checkbox, :radio').addClass("cbr-type")
        .end().filter(':file').addClass("file-type")
        .end().filter(':image').addClass("img-type")
        .end().filter(':submit, :reset, :button').addClass("btn-type");

    $('label').bind('click', function(){});

});

$(window).load(function(){

    $('img.swap, input:image.swap').each(function(){
        var obj = $(this);
        var tempSrc = obj.attr('src');

        obj.filter('[src$="swap.png"], [src$="swap.gif"]').each(function(){
            if(obj.is(':image')) {
                obj.bind('mouseover focus', function(){
                    obj.attr('src', tempSrc.replace(".swap", ".ov"));
                }).bind('mouseout blur', function(){
                    obj.attr('src', tempSrc.replace(".ov", ".swap"));
                }).on('click', function(){
                    obj.attr('src', tempSrc.replace(".swap", ".on"));
                });
            } else {
                obj.parents('a, button, label').bind('mouseenter focus', function(){
                    obj.attr('src', tempSrc.replace(".swap", ".ov"));
                }).bind('mouseleave blur', function(){
                    obj.attr('src', tempSrc.replace(".ov", ".swap"));
                });
            }
        });
    });

});

$(document).ready(function(){

    $('ul.tab').each(function(){
        if(!$(this).children('li').hasClass('selected')) {
            $(this).find('a[href^="#"]:first').closest('li').addClass("selected");
        }

        var $selected = $(this).find('>li.selected');
        var href = $selected.find('a').attr('href');
        var $swap = $selected.find('img[src$="swap.png"], img[src$="swap.gif"]');
        var $target = $(href).parent().children();

        $swap.each(function(){
            $(this).attr('src', $(this).attr('src').replace(".swap", ".on"));
        });

        $target.not(href).hide();

        $(this).find('a[href^="#"]').click(function(){
            $(this).closest('ul.tab').children('li').removeClass("selected")
                .find('img').filter('[src$=".on.png"], [src$=".on.gif"]').each(function(){
                    $(this).attr('src', $(this).attr('src').replace(".on", ".swap"));
            });
            $(this).closest('li').addClass("selected")
                .find('img').filter('[src$="swap.png"], [src$="swap.gif"]').each(function(){
                    $(this).attr('src', $(this).attr('src').replace(".swap", ".on"));
                }).find('img').filter('[src$="ov.png"], [src$="ov.gif"]').each(function(){
                    $(this).attr('src', $(this).attr('src').replace(".ov", ".on"));
            });

            $target.hide();
            $($(this).attr("href")).show();
            if($.browser.msie && $.browser.version == 8) $('body').css('border', "none");

            return false;
        });
    });

    $('input.placeholder, textarea.placeholder').each(function(index, obj){
        var $form = $(this);

        $form.removeAttr("placeholder");

        if($form.val() == "") {
            $form.addClass("valued");

            if($form.is(':password')) {
                if($.browser.msie && $.browser.version < 9) {
                    $form.before('<em class="placeholder" style="width: ' + $form.width() + 'px; ">' + obj.title + '</em>');

                    var $valid = $form.prev('em.placeholder');
                        $valid.bind($.browser.version < 7 ? 'mouseup' : 'mousedown', function() {obj.focus();} );

                    $form.focus(function(){
                        if($form.hasClass('valued')) {
                            $valid.hide()
                            .andSelf().removeClass("valued");
                        }
                    }).blur(function(){
                        if(!$.trim($form.val())) {
                            $valid.css('display', "")
                            .andSelf().addClass("valued");
                        }
                    }).trigger('blur');
                } else {
                    obj.setAttribute('type', "text");

                    $form.val(obj.title).focus(function(){
                        if($form.hasClass('valued')) {
                            obj.setAttribute('type', "password");
                            $form.val("").removeClass("valued");
                        }
                    }).blur(function(){
                        if(!$.trim($form.val())) {
                            obj.setAttribute('type', "text");
                            $form.val(obj.title).addClass("valued");
                        }
                    }).trigger('blur');
                }
            } else {
                $form.val(obj.title).focus(function(){
                    if($form.hasClass('valued')) $form.val("").removeClass("valued");
                }).blur(function(){
                    if(!$.trim($form.val())) $form.val(obj.title).addClass("valued");
                }).trigger('blur');
            }
        }
    });

    $('input.graphic').each(function(){
        var $form = $(this);
        var target = $form.attr('id');
        var $label = $('label[for="' + target + '"]');

        if($form.is(':checkbox')) {
            $label.prepend('<span class="graphic-checkbox"><\/span>');
        }
        else if($form.is(':radio')) {
            $label.prepend('<span class="graphic-radio ' + this.name + '-Radio"><\/span>');
        }

        $label.find('>span:first').append('<button type="button" title="' + this.title + '" class="' + $form.attr('class') + '"><\/button>')
        .find('>button').removeClass("graphic cbr-type").addClass(function(){
            if($form.is(':disabled')) return "disabled";
        }).addClass(function(){
            if($form.is(':checked')) return "check";
        }).parents('label').children().on('click', function(){
            if($.browser.msie && $.browser.version < 9) $form.toArray()[0].click();
        });

        $form.hide().click(function(){
            if($form.is(':checkbox')) {
                if($form.get(0).checked !== true) {
                    $label.find('>span:first>button').removeClass("check");
                } else {
                    $label.find('>span:first>button').addClass("check");
                }
            }
            else if($form.is(':radio')) {
                if($form.get(0).checked === true) {
                    $('span.' + this.name + '-Radio>button').removeClass("check");
                    $label.find('>span:first>button').addClass("check");
                }
            }
        });
    });

    $('.boxing').each(function(){
        $(this).children().addClass("box");
    });

    $('.box').each(function(){
        var childNodes = $(this).children(),
            $childNode = $(childNodes).filter(':only-child'),
            createElement = (childNodes.css('display') == undefined || $childNode.css('display') == "inline") ? 'span' : 'div';

        $(this).wrapInner('<' + createElement + ' class="box-wrap"><' + createElement + ' class="box-cnt" \/><\/' + createElement + '>');
    });

    $('.button-style.l-size').wrap('<span class="l-size-button-wrap" \/>');

//<-- Structure Added
    var isIOS4 = !DEVICE_CHK && DEVICE_INFO.iOSInfo.version==4;

    $('a, button').on('mousedown', function(){$(this).addClass("active");})
        .on('mouseup', function(){$(this).removeClass("active");})
        .bind('touchstart', function(){$(this).addClass("active");})
        .bind('touchend', function(){$(this).removeClass("active");});

    if(! isIOS4) {
        $('body:not(#signin)> #Document').children('#Header').each(function(){
                $(this).addClass((isIOS4) ? "absolute" : "fixed")
                    .parents('#Document').addClass("has-Header").css('padding-top', "" + $(this).height()-4 + "px");
            }).end().children('#Nav').each(function(){
                $(this).addClass((isIOS4) ? "absolute" : "fixed")
                    .parents('#Document').addClass("has-Nav")
            }).end().children('#Footer').not('.none').each(function(){
                $(this).addClass((isIOS4) ? "absolute" : "fixed")
                .parents('#Document').addClass("has-Footer").css('padding-bottom', "" + $(this).children('div.container').innerHeight() + "px")
                .children('#Aside').addClass("has-Footer");
        });
    } else {
        $('#Aside, #popHeader, #popFooter').addClass("absolute");
    }

    /* $('#Nav a').click(function(e){
        e.stopPropagation();
    }); */
//-->

});
