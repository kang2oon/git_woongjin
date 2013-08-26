<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>문의하기 < 고객지원</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type='text/javascript' src='/inc/js/common.js'></script>
	<script type="text/javascript" src="/inc/js/jquery-1.10.1.min.js"></script>
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
					<p><a href="/">Home</a> &gt; <a href="/customer/notice_list.aspx">고객지원</a> &gt; <span class="txtstrong">문의하기</span></p>
				</div>
				<div id="title" style="background:url('/images/customer/h2_bg_contactus.jpg');">
					<h2><img src="/images/customer/h2_contactus.gif" alt="웅진홀딩스는 고객님과 함께합니다. 궁금하신 사항은 문의하기로 접수해 주시면 각 서비스 담당자가 이메일로 답변해 드립니다."/></h2>
				</div>
				<textarea cols="100" rows="11" title="개인정보 수집 및 이용안내">
웅진홀딩스가 수집, 이용중인 본인의 개인정보는 『정보통신망이용촉진 및 정보보호 등에 관한 법률』에 따라 웅진홀딩스가 수집, 이용 시 본인의 동의를 얻어야 하는 정보입니다.
본인은 웅진홀딩스의 개인정보 수집, 이용에 동의합니다.

'웅진홀딩스'은 (이하 '회사'는)
고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.

회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

회사는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

ο 본 방침은 : 2011 년 08 월 18 일 부터 시행됩니다.

1. 수집하는 개인정보의 항목
- 신상정보 : 이름, 이메일, 연락처

2. 개인정보의 수집?이용 목적
회사는 개인정보를 다음의 목적을 위해 수집하고 활용합니다.
- 회사관련 문의, 서비스/상품 문의, 투자 문의, 홈페이지 및 ERP구축 문의 등에 대한 상담 제공,
상담내역의 이력관리

개인정보 제공 부동의 시 위 상담서비스 이용에 제한을 받을 수 있습니다.

3. 개인정보의 보유 및 이용기간
회사는 모든 개인정보 입력항목에 대하여 입력한 날의 익월부터 12개월간 보유하기로 하며, 본 기간 종료 시 해당 정보를 지체 없이 파기합니다. 본 기간 경과 전이라도 제공한 개인정보에 대하여 파기를 원하는 개인은 본 메일로 요청 주시면 바로 처리하겠습니다. 
				</textarea>
				<div class="txtright"><input id="agree" type="checkbox"/><label for="agree">개인정보 수집 및 이용안내에 동의합니다.</label></div>
				<div class="txtright mgtop20"><span class="mark_star">*</span> 사항은 필수 입력 사항입니다. 모든 항목을 반드시 입력 하셔야만 문의 접수가 가능합니다.</div>
				<table cellspacing="0" cellpadding="0" class="table_contact_us">
					<caption>문의하기</caption>
					<colgroup>
						<col width="100" />
						<col />
					</colgroup>
					<tbody>
					<tr>
						<th scope="row"><span class="mark_star">*</span> <label for="cu_nm">이름</label></th>
						<td><input id="cu_nm" type="text" style="width:200px;"/></td>
					</tr>
					<tr>
						<th scope="row"><span class="mark_star">*</span> <label for="cu_tel">연락처</label></th>
						<td><input id="cu_tel" type="text" style="width:60px;"/> - <input id="cu_tel2" type="text" title="국번" style="width:60px;"/> - <input id="cu_tel3" type="text" title="전화번호" style="width:60px;"/></td>
					</tr>
					<tr>
						<th scope="row"><span class="mark_star">*</span> <label for="cu_mail">이메일</label></th>
						<td><input id="cu_mail" type="text" style="width:150px;"/> <input id="cu_mail2" type="text" title="메일 제공업체" style="width:150px;"/> <select title="메일 제공업체 선택">
							<option selected="selected">직접입력</option>
							<option>naver.com</option>
							<option>nate.com</option>
						</select>
						</td>
					</tr>
					<tr>
						<th scope="row"><span class="mark_star">*</span> 사업영역</th>
						<td><input id="cu_busi" type="radio" name="cu_business" value="FM사업"/> <label for="cu_busi">FM사업</label>&nbsp;&nbsp;
						<input id="cu_busi2" type="radio" name="cu_business" value="콜센터"/> <label for="cu_busi2">콜센터</label>&nbsp;&nbsp;
						<input id="cu_busi3" type="radio" name="cu_business" value="IT서비스"/> <label for="cu_busi3">IT서비스</label>&nbsp;&nbsp;
						<input id="cu_busi4" type="radio" name="cu_business" value="ERP"/> <label for="cu_busi4">ERP</label></td>
					</tr>
					<tr>
						<th scope="row"><span class="mark_star">*</span> 질문유형</th>
						<td><input id="cu_guest" type="radio" name="cu_question" value="서비스 or 솔루션 문의"/> <label for="cu_guest">서비스 or 솔루션 문의</label>&nbsp;&nbsp;
						<input id="cu_guest2" type="radio" name="cu_question" value="제안"/> <label for="cu_guest2">제안</label>&nbsp;&nbsp;
						<input id="cu_guest3" type="radio" name="cu_question" value="기타"/> <label for="cu_guest3">기타</label></td>
					</tr>
					<tr>
						<th scope="row"><span class="mark_star">*</span> <label for="cu_subject">제목</label></th>
						<td><input id="cu_subject" type="text" style="width:200px;"/></td>
					</tr>
					<tr>
						<th scope="row"><span class="mark_star">*</span> <label for="cu_content">문의내용</label></th>
						<td><textarea id="cu_content" cols="50" rows="5"></textarea></td>
					</tr>
					<tr>
						<th scope="row" class="last_row"><label for="cu_attach">첨부파일</label></th>
						<td class="last_row"><input id="cu_attach" type="file"/>&nbsp;&nbsp;&nbsp;※ 첨부파일은 문서나 이미지 파일만 가능합니다.</td>
					</tr>
					</tbody>
				</table>
				<div class="clearfix">
					<div class="fleft">※ 본 난의 취지에 부합되지 않은 내용(광고성글, 비방, 욕설)은 답변없이 임의로 삭제될 수 있습니다.</div>
					<div class="fright"><input type="image" src="/images/customer/btn_ok.gif" alt="문의하기"/></div>
				</div>

			</div>
		</div>
		
		<!--#include file="/inc/footer.aspx"-->
	</div>

</body>
</html>