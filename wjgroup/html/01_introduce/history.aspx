<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 연혁" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>연혁 - 웅진그룹</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type='text/javascript' src='/inc/js/common.js'></script>
	<script type='text/javascript' src='/inc/js/jquery-1.10.1.min.js'></script>
	<script type="text/javascript">
		$(document).ready(function () {
			$(".tab").click(function() {
				$(".tab ").removeClass("selected");
				$(this).addClass("selected")
			})
		})
	</script>
</head>
<body id="history">
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
					<h2 class="fleft"><img src="/images/01_introduce/010401_title.gif" alt="연혁"/></h2>
					<ul>
						<li><a href="/"><img src="/images/common/loc_home.gif" alt="HOME"/></a></li>
						<li><a href="/html/01_introduce/wj_group.aspx">웅진소개</a></li>
						<li><a href="/html/01_introduce/history.aspx">발자취</a></li>
						<li><a href="/html/01_introduce/history.aspx">연혁</a></li>
					</ul>
				</div>
				<div class="section">
					<ul id="history_year" class="clearfix">
						<li class="tab selected"><img src="/images/01_introduce/tab_history_1.gif" alt="2007~2013" onclick="show('history1');hide('history2');hide('history3');hide('history4');hide('history5');hide('history6');"/></li>
						<li class="tab"><img src="/images/01_introduce/tab_history_2.gif" alt="2003~2006" onclick="hide('history1');show('history2');hide('history3');hide('history4');hide('history5');hide('history6');"/></li>
						<li class="tab"><img src="/images/01_introduce/tab_history_3.gif" alt="1998~2002" onclick="hide('history1');hide('history2');show('history3');hide('history4');hide('history5');hide('history6');"/></li>
						<li class="tab"><img src="/images/01_introduce/tab_history_4.gif" alt="1994~1997" onclick="hide('history1');hide('history2');hide('history3');show('history4');hide('history5');hide('history6');"/></li>
						<li class="tab"><img src="/images/01_introduce/tab_history_5.gif" alt="1988~1993" onclick="hide('history1');hide('history2');hide('history3');hide('history4');show('history5');hide('history6');"/></li>
						<li class="tab"><img src="/images/01_introduce/tab_history_6.gif" alt="1980~1987" onclick="hide('history1');hide('history2');hide('history3');hide('history4');hide('history5');show('history6');"/></li>
					</ul>
					<div id="history1" style="display:block;">
						<img src="/images/01_introduce/history_mainimg_1.gif" class="history_mainimg" alt="2007년부터 2013년 더 큰 성장을 위한 끊임없는 변화와 도전"/>
						<div class="pdtop30 clearfix">
							<div class="history_year">2013</div>
							<div class="history_detail">웅진코웨이 매각<br/>웅진패스원 매각</div>
							<div class="history_year">2011</div>
							<div class="history_detail">웅진씽크빅 바른교육 큰사람 캠페인 대한민국 광고대상 수상</div>
							<div class="history_year">2010</div>
							<div class="history_detail">웅진그룹 저탄소경영 선포<br/>웅진씽크빅 부산 국제화센터 개관<br/>웅진그룹 30주년 창립 기념식<br/>웅진그룹 30년사 '서른살의 웅진이야기' 발간<br/>
							웅진에너지 상장<br/>웅진에너지 제2공장 준공</div>
							<div class="history_year">2009</div>
							<div class="history_detail">웅진폴리실리콘 성주공장 기공<br/>웅진그룹 본사 및 계열사 극동빌딩 이전<br/>웅진그룹 저탄소 경영시스템 조성<br/>
							웅진식품 &lt;대단한 콩&gt; 레드닷 디자인 어워드 수상<br/>웅진플레이도시 인수</div>
							<div class="history_year">2008</div>
							<div class="history_detail">웅진그룹 새 CI 선포<br/>웅진씽크빅 &lt;펭귄클래스시리즈&gt; 발간<br/>웅진재단 설립<br/>웅진씽크빅 전집 통합 브랜드 '웅진다책' 출시<br/>
							렉스필드컨트리클럽 환경부 장관상 표창<br/>웅진폴리실리콘 설립<br/>웅진재단 '다문화가족 음악방송' 개국</div>
							<div class="history_year">2007</div>
							<div class="history_detail">웅진패스원 설립<br/>극동건설 인수<br/>웅진씽크빅 파주사옥 '2007 한국건축문화대상' 민간건축 부문 대상<br/>웅진에너지 대전공장 준공식 개최</div>
						</div>
					</div>
					<div id="history2" style="display:none;">
						<img src="/images/01_introduce/history_mainimg_2.gif" class="history_mainimg" alt="2003년부터 2006년 그룹 인프라 완성과 핵심 가치 정립"/>
						<div class="pdtop30 clearfix">
							<div class="history_year">2006</div>
							<div class="history_detail">웅진그룹 환경경영 선포식<br/>렉스필드컨트리클럽 ISO9001, ISO14001 인증 획득<br/>웅진그룹 유구천 가꾸기 시범 사업 협약식<br/>
							웅진에너지 설립</div>
							<div class="history_year">2005</div>
							<div class="history_detail">웅진닷컴 웅진씽크빅으로 사명 변경</div>
							<div class="history_year">2004</div>
							<div class="history_detail">웅진닷컴 일번 에이코우 '에듀케이셔널 네트워크'와 '씽크빅'의 저작권 수출 계약 체결<br/>
							웅진닷컴 '2004 볼라냐 국제아동도서전' 라가치상 수상<br/>웅진닷컴 '바른 교육 큰 사람' 캠페인 대한민국 광고대상 라디오 부문 금상<br/>
							북센 출판물 종합유통센터 준공</div>
							<div class="history_year">2003</div>
							<div class="history_detail">한국출판유통 주식회사 북센(BOOXEN)으로 상호 변경<br/>웅진닷컴 전래동화 전집 &lt;호롱불 옛 이야기&gt; 출시<br/>
							렉스필드컨트리클럽 그랜드 오픈<br/>웅진그룹 윤리경영 선포식</div>
						</div>
					</div>
					<div id="history3" style="display:none;">
						<img src="/images/01_introduce/history_mainimg_3.gif" class="history_mainimg" alt="1998년부터 2002년 경제위기의 극복, 신화창조"/>
						<div class="pdtop30 clearfix">
							<div class="history_year">2002</div>
							<div class="history_detail">웅진닷컴 &lt;그 많던 싱아는 누가 다 먹었을까&gt; MBC느낌표 캠페인 도서 선정</div>
							<div class="history_year">2001</div>
							<div class="history_detail">웅진식품 &lt;아침햇살&gt; 제조 기술 미국 특허 획득</div>
							<div class="history_year">2000</div>
							<div class="history_detail">웅진출판, 웅진닷컴으로 사명 변경<br/>웅진식품 &lt;하늘보리&gt; 출시<br/>웅진닷컴 이윤기의 &lt;그리스 로마 신화&gt; 발행</div>
							<div class="history_year">1999</div>
							<div class="history_detail">웅진식품 &lt;아침햇살&gt; 출시<br/>웅진식품 &lt;초록매실&gt; 출시</div>
							<div class="history_year">1998</div>
							<div class="history_detail">웅진출판 &lt;곰돌이 웅진아이큐&gt; 발행<br/>웅진출판 &lt;21세기 웅진학습백과사전&gt; 발행<br/>웅진출판 '제7회 경제정의기업상' 수상<br/>
							웅진출판 어린이 인물잡지 &lt;생각쟁이&gt; 창간</div>
						</div>
					</div>
					<div id="history4" style="display:none;">
						<img src="/images/01_introduce/history_mainimg_4.gif" class="history_mainimg" alt="1994년부터 1997년 창조와 혁신의 기업문화 구축"/>
						<div class="pdtop30 clearfix">
							<div class="history_year">1996</div>
							<div class="history_detail">웅진인삼 웅진식품주식회사로 사명 변경</div>
							<div class="history_year">1995</div>
							<div class="history_detail">웅진인삼 &lt;가을대추&gt; 출시<br/>웅진출판 &lt;브리태니커&gt; 사업본부 출범식</div>
							<div class="history_year">1994</div>
							<div class="history_detail">웅진출판 &lt;웅진용운수학&gt; 출시<br/>웅진출판 주식 상장</div>
						</div>
						<div style="height:200px;"></div>
					</div>
					<div id="history5" style="display:none;">
						<img src="/images/01_introduce/history_mainimg_5.gif" class="history_mainimg" alt="1988년부터 1993년 지속적인 성장과 새로운 도전"/>
						<div class="pdtop30 clearfix">
							<div class="history_year">1993</div>
							<div class="history_detail">웅진출판 월간잡지 &lt;마이웨딩&gt; 창간<br/>웅진출판 &lt;한국의 자연탐험&gt; 출간</div>
							<div class="history_year">1992</div>
							<div class="history_detail">웅진출판 어린이 자연생태 잡지 월간&lt;까지&gt; 창간<br/>웅진출판 박완서의 성장소설 &lt;그 많던 싱아는 누가 다 먹었을까&gt; 출간</div>
							<div class="history_year">1991</div>
							<div class="history_detail">웅진그룹 사가 '웅진식구의 노래' 제작 발표<br/>웅진출판 첫 잡지 &lt;웅진여성&gt; 발간</div>
							<div class="history_year">1990</div>
							<div class="history_detail">웅진출판 단행본 개발부 신설<br/>웅진그룹 창립 10주년 기념식 개최<br/>웅진출판 &lt;웅진 애니메이션 한국의 역사&gt; 출간</div>
							<div class="history_year">1988</div>
							<div class="history_detail">웅진출판 &lt;한국아동문학대표작선집&gt;발간<br/>웅진출판 첫 단행본 &lt;웅진교육신서&gt; 발간<br/>
							웅진출판 사보 &lt;웅진하눌타리&gt; 창간<br/>웅진출판 &lt;윤석중전집&gt; 발간<br/>웅진출판 기업 심볼 및 로고타입 제정<br/>동일삼업 웅진인삼(주)로 상호 변경</div>
						</div>
					</div>
					<div id="history6" style="display:none;">
						<img src="/images/01_introduce/history_mainimg_6.gif" class="history_mainimg" alt="1980년부터 1987년 웅진의 시작과 도약"/>
						<div class="pdtop30 clearfix">
							<div class="history_year">1987</div>
							<div class="history_detail">웅진출판 &lt;웅진위인전기&gt; 발간</div>
							<div class="history_year">1986</div>
							<div class="history_detail">웅진출판 &lt;세계전래동화&gt; 발간<br/>웅진출판 &lt;웅진아이큐&gt; 출시</div>
							<div class="history_year">1985</div>
							<div class="history_detail">웅진출판 &lt;한국전래동화&gt; 발간</div>
							<div class="history_year">1984</div>
							<div class="history_detail">웅진출판 &lt;혜임중학학습&gt; 발간<br/>웅진출판 &lt;이원수 아동문학전집&gt; 발간<br/>웅진출판 &lt;어린이 마을&gt; 발간</div>
							<div class="history_year">1983</div>
							<div class="history_detail">도서출판 혜임인터내셔널 웅진출판(주)로 사명 변경</div>
							<div class="history_year">1982</div>
							<div class="history_detail">도서출판 혜임인터내셔널 편집개발부 신설</div>
							<div class="history_year">1981</div>
							<div class="history_detail">도서출판 혜임인터내셔널 &lt;혜임고교학습&gt; 발간</div>
							<div class="history_year">1980</div>
							<div class="history_detail">도서출판 '혜임인터내셔널(現 (주)웅진씽크빅)' 설립<br/>도서출판 혜임인터내셔널 &lt;메슬 MESL&gt; 한글판 해설서 발간</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--#include file="/footer.aspx"-->
	</div>
</body>
</html>