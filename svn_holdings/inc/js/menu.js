var tempURL = '';
$(document).ready(function() {

    // 현재 페이지의 URL 가져오기
    var TopMenuAreaID = 'gnbitem'; // top menu
    var SubMenuAreaID = 'snb'; // left menu


    // Left Menu
    fnMenuEvent(SubMenuAreaID);
    fnMenuSelect(SubMenuAreaID);
    $('div[id=' + SubMenuAreaID + ']').each(function(index, element) {
        // 메뉴 상태 유지
        $(element).mouseleave(function(e) {
            //fnMenuSelect(SubMenuAreaID);
        });
    });


    // Top Menu
    fnMenuEvent(TopMenuAreaID);
    fnMenuSelect(TopMenuAreaID);
    $('div[id=' + TopMenuAreaID + ']').each(function(index, element) {
        // 메뉴 상태 유지
        $(element).mouseleave(function(e) {
            fnMenuSelect(TopMenuAreaID);
        });
    });
});
// Menu Select
function fnMenuSelect(MenuAreaID) {

    var currentHref = window.location.pathname;

    if (currentHref.length == 1) return;

    if (tempURL != undefined && tempURL != '') {
        currentHref = tempURL;
    }

    currentHref = fnGetPageMapping(currentHref);
    

    var $current = null;

    //b alert(MenuAreaID);

    // 메뉴 영역 찾기
    $('div[id=' + MenuAreaID + ']').each(function(index, element) {
        var $tmpElement = $(element).find('li > a[href=\'' + currentHref + '\']');
        if ($tmpElement.get(0) != undefined) {
            $tmpElement.each(function(idx, elm) {
                $current = $(elm);
            });
        }
    });

    // 선택된 메뉴 영역에서 해당 메뉴 선택
    if ($current) {


        // 부모노드 선택
        var bool = true;
        var $parent = $current;

        while (bool) {

            // 무한 루프 방지
            if ($parent.get(0) == undefined || MenuAreaID == $parent.attr('id')) {
                bool = false;
            }

            try {
                // 이미지 롤오버
                if ($parent.get(0).tagName == 'DIV') {
                    $parent = $parent.prev('a');

                    if ($parent.find('img[class=sidemenu]').get(0) != undefined) {
                        tempURL = $parent.attr('href');
                    }
                    
                }
                fnMenuToggle($parent, 'F');
            }
            catch (e) {
            }

            $parent = $parent.parent();
        }
    }
}


//
function fnMenuEvent(MenuAreaID) {
    $('div[id=' + MenuAreaID + ']').each(function(index, element) {

        var $menuItem = $(element).find('li > a');

        //
        if ($menuItem.get(0) != undefined) {
            $menuItem.each(function(idx, el) {
                $(el).mouseover(function(e) {
                    fnMenuToggle(el, 'I');
                }).mouseout(function(e) {
                    fnMenuToggle(el, 'O');
                }).focusout(function(e) {
                    fnMenuToggle(el, 'O');
                }).focusin(function(e) {
                    fnMenuToggle(el, 'I');
                });
            });

        }

    });
}

// 이미지 변경및 서브 메뉴 활성 ( flag ==> I : IN, O : OUT, F : FIRST )
function fnMenuToggle(obj, flag) {
    try {
        var $el = $(obj).children('img');
        $($el).each(function(index, element) {
            var src = $(element).attr('src');
            if (src) {
                if (flag == 'F')
                    $(element).attr('data-menu', 'on');
                if (src.indexOf('_n.gif') >= 0) {
                    src = src.replace('_n.gif', '_o.gif');
                }
                else {
                    var strMenu = $(element).attr('data-menu');
                    if (strMenu != 'on')
                        src = src.replace('_o.gif', '_n.gif');
                }
                $(element).attr('src', src); // 이미지 변경
            }

            // 서브 메뉴 활성화
            var $tmp = $(element).parent().next('div');
            if ($tmp.get(0) != undefined) {
                if (flag != 'O') {
                    // 다른메뉴 가리기
                    var $temp = $(element).parent().parent('li').parent('ul').find('div');
                    if ($temp.get(0) != undefined) {
                        if ($temp.get(0).tagName == 'DIV') {
                            $temp.each(function(subindex, subElement) {
                                $(subElement).hide();
                            });
                        }
                    }
                }
                $tmp.show();
            }

        });
    }
    catch (e) {
        //alert(e.message);
    }
}

// 동일한 메뉴의 서브페이지로 인하여...
function fnGetPageMapping(pageUrl) {

    var rtnVal = '';

    // 대체 페이지 목록
    var MenuList = new Array();
    MenuList['notice_view.aspx'] = 'notice_list.aspx';
    MenuList['revival_view.aspx'] = 'revival_list.aspx';
    MenuList['a_one_erp2.aspx'] = 'a_one_erp1.aspx';
    MenuList['a_one_erp3.aspx'] = 'a_one_erp1.aspx';
    MenuList['a_one_erp4.aspx'] = 'a_one_erp1.aspx';
    MenuList['a_one_erp5.aspx'] = 'a_one_erp1.aspx';
    MenuList['a_one_erp6.aspx'] = 'a_one_erp1.aspx';
    MenuList['a_one_erp7.aspx'] = 'a_one_erp1.aspx';
    MenuList['b_one_erp2.aspx'] = 'b_one_erp1.aspx';
    MenuList['b_one_erp3.aspx'] = 'b_one_erp1.aspx';
    MenuList['b_one_erp4.aspx'] = 'b_one_erp1.aspx';
    MenuList['b_one_erp5.aspx'] = 'b_one_erp1.aspx';
    MenuList['education2.aspx'] = 'education1.aspx';
    MenuList['education3.aspx'] = 'education1.aspx';
    MenuList['education4.aspx'] = 'education1.aspx';
    

    //
    try {
        var pageName = pageUrl.substr(pageUrl.lastIndexOf('/') + 1);

        if (MenuList[pageName] == undefined) {
            rtnVal = pageUrl;
        }
        else {
            rtnVal = pageUrl.replace(pageName, MenuList[pageName]);
        }
    }
    catch (e) {
        rtnVal = pageUrl;
    }

    return rtnVal;
}

// 페이지 내 서브 탭 활성화
$(document).ready(function() {
	$('#tab li').each(function() {
		var dir_path = window.location.pathname;
		var href = $(this).find('a').attr('href');
		if (href == window.location.pathname) {
			$(this).addClass('current_tab');
			var selectedImg2 = $('.current_tab > a >img');
			var sURL2 = selectedImg2.attr('src').replace('_n.gif', '_o.gif');
			selectedImg2.attr("src", sURL2);
		}
	});
});