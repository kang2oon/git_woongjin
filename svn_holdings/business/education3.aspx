<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>강의커리큘럼 < SAP Education < IT서비스&amp;솔루션 < 사업분야</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type='text/javascript' src='/inc/js/common.js'></script>
	<script type="text/javascript" src="/inc/js/jquery-1.10.1.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function () {
			$(".tab").click(function() {
				$(".tab ").removeClass("selected");
				$(this).addClass("selected");
				var ctab = $('.selected a img');
				var stateon = ctab.attr('src').replace('_n.gif', '_o.gif');
				ctab.attr("src", stateon);
			})
		})

	var default_stab_id = current_stab_id = 1;
	var switchTab = function(id) {
		
		$('div[id=stab] > ul > li > h3 > a > img').each(function (idx, element) {
			var resetstate = $(element).attr('src');
			resetstate = resetstate.replace('_o.gif', '_n.gif');
			 $(element).attr('src', resetstate);
		});
	
		document.getElementById("tcont_" + current_stab_id).style.display = "none";
		document.getElementById("tcont_" + id).style.display = "block";
		
		current_stab_id = id;
	}
	</script>
</head>
<body>
	<ul id="skipNavi">
		<li><a href="#gnb">주메뉴 바로가기</a></li>
		<li><a href="#snb">보조메뉴 바로가기</a></li>
		<li><a href="#article">본문 바로가기</a></li>
	</ul>
	
	<div id="wrap">
		<!--#include file="/inc/header.aspx"-->
		
		<div id="article">
		
			<!--#include file="snb.aspx"-->
			<div id="content">
				<div id="lnb">
					<p><a href="/">Home</a> &gt; <a href="/business/a_one_erp1.aspx">사업분야</a> &gt; <a href="/business/a_one_erp1.aspx">IT서비스&amp;솔루션</a> &gt; <span class="txtstrong">SAP Education</span></p>
				</div>
				<div id="title" style="background:url('/images/business/h2_bg_sap_edu.gif');">
					<h2><img src="/images/business/h2_sap_edu.gif" alt="SAP Education SAP 교육 Partner 사 웅진홀딩스는  SAP 교육 사업을 통해 고객 중심의 맟춤형 교육 솔루션을 제공합니다."/></h2>
				</div>
				<!--#include file="tab_edu.aspx"-->
				
				<div id="stab">
					<h4>SAP All in one</h4>
					<ul class="clearfix">
						<li class="tab selected"><h3><a href="javascript:void(0);" onclick="switchTab(1); return false"><img src="/images/business/stab_edu301_o.gif" alt="FI(재무회계)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(2); return false"><img src="/images/business/stab_edu302_n.gif" alt="CO(관리회계)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(3); return false"><img src="/images/business/stab_edu303_n.gif" alt="SD(영업관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(4); return false"><img src="/images/business/stab_edu304_n.gif" alt="PP(생산관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(5); return false"><img src="/images/business/stab_edu305_n.gif" alt="MM(구매자재관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(6); return false"><img src="/images/business/stab_edu306_n.gif" alt="TR(자금수지)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(7); return false"><img src="/images/business/stab_edu307_n.gif" alt="LE(물류실행)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(8); return false"><img src="/images/business/stab_edu308_n.gif" alt="WM(창고관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(9); return false"><img src="/images/business/stab_edu309_n.gif" alt="PS(프로젝트관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(10); return false"><img src="/images/business/stab_edu310_n.gif" alt="BC(시스템관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(11); return false"><img src="/images/business/stab_edu311_n.gif" alt="PM(설비관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(12); return false"><img src="/images/business/stab_edu312_n.gif" alt="QM(품질관리)"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(13); return false"><img src="/images/business/stab_edu313_n.gif" alt="BW"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(14); return false"><img src="/images/business/stab_edu314_n.gif" alt="CMS"/></a></h3></li>
					</ul>
					<h4>SAP Business one</h4>
					<ul class="clearfix">
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(15); return false"><img src="/images/business/stab_edu315_n.gif" alt="사용자 교육"/></a></h3></li>
					</ul>
					
					<div id="tcont_1">
						<!--#include file="lecture_fi.aspx"-->
					</div>
					
					<div id="tcont_2" style="display:none;">
						<!--#include file="lecture_co.aspx"-->
					</div>
					
					<div id="tcont_3" style="display:none;">
						<!--#include file="lecture_sd.aspx"-->
					</div>
					
					<div id="tcont_4" style="display:none;">
						<!--#include file="lecture_pp.aspx"-->
					</div>
					
					<div id="tcont_5" style="display:none;">
						<!--#include file="lecture_mm.aspx"-->
					</div>
					
					<div id="tcont_6" style="display:none;">
						<!--#include file="lecture_tr.aspx"-->
					</div>
					
					<div id="tcont_7" style="display:none;">
						<!--#include file="lecture_le.aspx"-->
					</div>
					
					<div id="tcont_8" style="display:none;">
						<!--#include file="lecture_wm.aspx"-->
					</div>
					
					<div id="tcont_9" style="display:none;">
						<!--#include file="lecture_ps.aspx"-->
					</div>
					
					<div id="tcont_10" style="display:none;">
						<!--#include file="lecture_bc.aspx"-->
					</div>
					
					<div id="tcont_11" style="display:none;">
						<!--#include file="lecture_pm.aspx"-->
					</div>
					
					<div id="tcont_12" style="display:none;">
						<!--#include file="lecture_qm.aspx"-->
					</div>
					
					<div id="tcont_13" style="display:none;">
						<!--#include file="lecture_bw.aspx"-->
					</div>
					
					<div id="tcont_14" style="display:none;">
						<!--#include file="lecture_cms.aspx"-->
					</div>
					
					<div id="tcont_15" style="display:none;">
						<!--#include file="lecture_user.aspx"-->
					</div>
				
				</div>
				
			</div>
		</div>
		
		<!--#include file="/inc/footer.aspx"-->
	</div>

</body>
</html>