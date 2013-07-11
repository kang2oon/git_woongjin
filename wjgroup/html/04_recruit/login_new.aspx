<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 지원정보 수정 및 결과확인" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>지원정보 수정 및 결과확인 - 웅진그룹</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type='text/javascript' src='/inc/js/common.js'></script>
	<script language="javascript" type="text/javascript">
		document.domain = "woongjin.com";
		function li_Click(num){
		}
		function autoResize(i){
			var iframeHeight= document.getElementById("list").contentWindow.document.body.scrollHeight;
			document.getElementById("list").height=iframeHeight;
		}
	</script>
</head>
<body id="login">
	<ul id="skipNavi">
		<li><a href="#gnb">주메뉴 바로가기</a></li>
		<li><a href="#snb">보조메뉴 바로가기</a></li>
		<li><a href="#article">본문 바로가기</a></li>
	</ul>

	<div id="wrap">
		<!--#include file="/header.aspx"-->
		<div id="content" class="clearfix">
			<div id="snb">
				<!--#include file="snb.aspx"-->
			</div>
			<div id="article">
				<div id="lnb" class="clearfix">
					<h2 class="fleft"><img src="/images/04_recruit/040401_title.gif" alt="채용공고"/></h2>
					<ul>
						<li><a href="/"><img src="/images/common/loc_home.gif" alt="HOME"/></a></li>
						<li><a href="/html/04_recruit/notice_list_new.aspx">채용정보</a></li>
						<li><a href="/html/04_recruit/login_new.aspx">지원정보 수정 및 결과확인</a></li>
					</ul>
				</div>
				<div class="section">
					<iframe id="list" width="650" scrolling="no" height="583" frameborder="0" onload="autoResize()" src="https://recruituser.woongjin.com:4433/Login/MyInfoLogin.aspx" name="list"></iframe>
				</div>
			</div>
		</div>
		<!--#include file="/footer.aspx"-->
	</div>
</body>
</html>