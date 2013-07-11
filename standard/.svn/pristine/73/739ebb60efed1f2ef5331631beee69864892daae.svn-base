<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>CSS Guide - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="name_css">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>CSS Guide</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#basic">기본 규칙</a></li>
						<li><a href="#id_class">id/calss 규칙</a></li>
						<li><a href="#fix">예약어 규칙</a></li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<div class="info_box mgtop30">
					CSS 파일을 여러개로 나누는 경우 HTTP 요청이 늘어나서 웹페이지 전송 속도에 좋지 않은 영향을 주게 되므로 파일의 수는 최소한으로 유지합니다. 
					전역으로 사용되는 파일의 이름은 style.css로 지정하고 /inc/css/ 폴더를 생성하여 해당 디렉토리에 위치시킵니다.<br/><br/>
					/inc/css/style.css : 모든 스타일을 포함하는 전역 스타일시트 파일<br/>
					/inc/css/popup.css : 팝업 등 새로운 페이지 유형이 존재하는 경우 별도로 분리
				</div>
				<h3 class="mgtop20"><a name="basic"><i class="icon-chevron-right"></i> 기본 규칙</a></h3>
				다음과 같은 기본 네이밍 규칙을 준수한다.
				<ol class="mgtop20">
					<li>일반 규칙
						<p class="mgleft20">이름은 영문 소문자, 숫자, 언더스코어(_)로 작성한다.</p>
					</li>
					<li>시작 이름
						<p class="mgleft20">이름은 영문 대문자, 숫자로 시작은 지양한다.</p>
						<div class="info_box mgleft20">
							Btn (X) --> btn (O)<br/>
							2btn (X) --> btn2 (O)
						</div>
					</li>
					<li>조합 규칙
						<ol class="typei list_step2">
							<li>언더스코어(_)는 2개 이상의 단어를 조합할 경우만 사용한다.</li>
							<li>단어와 숫자를 조합하는 경우 언더스코어(_)를 생략한다.</li>
							<li>언더스코어(_)를 이용하는 경우 '형태_의미_상태' 순으로 3단계를 넘지 않도록 권장한다.</li>
							<li>naming 정의 시 예약어(prefix, subfix, suffix)를 최대한 활용한다.</li>
						</ol>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="id_class"><i class="icon-chevron-right"></i> id/calss 규칙</a></h3>
				<ol>
					<li>id는 camelcase 방식으로 하며, class는 underscore 방식으로 사용한다.
						<div class="info_box mgleft20">
							id="boardView"<br/>
							class="link_view"
						</div>
					</li>
					<li>id는 화면에서의 고유 기능을 명시하도록 naminng 한다.
						<div class="info_box mgleft20">
							id="btnSearch" (X) --> id="btnGnbSearch" (O)
						</div>
					</li>
					<li>class는 요소 기능을 표현하도록 naming 한다.</li>
					<li>id는 문서 전체의 고유 식별자이므로 한 문서에서 동일한 id를 여러 번 사용하지 않는다.</li>
					<li>가능하다면 의미에 적합하고 직곽전인 하나의 단어를 사용하고, 화면 배치 또는 시각적 효과를 의미하는 단어의 선택은 지양한다.</li>
					<li>두문자어 또는 약어를 사용하더라도 직관적으로 이해할 수 있는 경우 단어를 축약할 수 있습니다.</li>
					<li>숫자로 시작할 수 없으며 숫자의 증가는 '1'부터 시작, 숫자가 없는 경우 통상 '1'이라는 숫자가 생략된 것으로 간주한다.</li>
					<li>보편적인 이름을 지닌 class는 항상 충돌 가능성이 존재하므로 가급적 부모 선택자에 종속 시킵니다.
						<div class="info_box mgleft20">
							.more{...} (△) : more라는 클래스 이름을 더 이상 사용할 수 없음.<br/>
							.section .more{...} (O) : more라는 클래스를 여러번 재사용할 수 있음.
						</div>
					</li>
					<li>모든 영역에 동일한 표현으로 재 사용되는 전역 스타일인 경우 다른 선택자에 종속시키지 않습니다.
						<div class="info_box mgleft20">
							.gnb fieldset{border:none;} (△) : 전역 스타일을 특정 영역에 종속시켜 재사용성이 떨어짐.<br/>
							fieldset{border:none;} (O) : 보통의 경우 fieldset을 이용하여 border를 표현하지 않으므로 어떤 선택자에도 종속시키지 않는다.
						</div>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="fix"><i class="icon-chevron-right"></i> 예약어 규칙</a></h3>
				<ol>
					<li>Prefix
						<ol class="typei list_step2">
							<li>접두어를 의미하는 것으로, 앞부분에 사용하며, 주로 형태를 나타내는데 사용된다. (tab_notice, tbl_product 등)</li>
							<li>기본 Prefix는 형태별로 통일한다.</li>
							<li>서브 Prefix가 필요한 부분은 underscore로 구분하여 표기한다. (line/line_dot)</li>
							<li>Prefix 리스트에 한해 subfix, suffix에서 축약형 naming을 사용한다.</li>
							<li>분류별 Prefix 부가설명
								<table cellspacing="0" cellpadding="0">
									<caption>표3-1-1 분류별 Prefix 부가설명</caption>
									<colgroup>
									<col width="100" />
									<col width="150" />
									<col  />
									</colgroup>
									<thead>
									<tr>
										<th scope="col">분류</th>
										<th scope="col">Prefix</th>
										<th scope="col">부가 설명</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td class="txtcenter">타이틀</td>
										<td>tit</td>
										<td>일반적인 타이틀</td>
									</tr>
									<tr>
										<td class="txtcenter" rowspan="3">영역</td>
										<td>wrap</td>
										<td>일반영역의 묶음 (선택적 사용, 중첩 사용 지양)</td>
									</tr>
									<tr>
										<td>section</td>
										<td>제목 태그(Heading Tag)를 지닌 영역 구분 (선택적 사용, 중첩 사용 지양)</td>
									</tr>
									<tr>
										<td>inner</td>
										<td>부모 wrapper가 존재하며 자식 묶음이 단돈으로 필요한 경우</td>
									</tr>
									<tr>
										<td class="txtcenter" rowspan="3">네비게이션</td>
										<td>gnb</td>
										<td>서비스 전체 네비게이션</td>
									</tr>
									<tr>
										<td>lnb</td>
										<td>지역 네비게이션 (gnb 영역)</td>
									</tr>
									<tr>
										<td>snb</td>
										<td>사이드 네비게이션 (좌/우측 메뉴)</td>
									</tr>
									<tr>
										<td class="txtcenter">탭</td>
										<td>tab</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">테이블</td>
										<td>tbl</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">목록</td>
										<td>list</td>
										<td>일반 목록 (ul, ol, 리스트 형식의 dl)</td>
									</tr>
									<tr>
										<td class="txtcenter" rowspan="5">폼</td>
										<td>tf</td>
										<td>textfield (input 타입 text/textarea)</td>
									</tr>
									<tr>
										<td>inp</td>
										<td>input 타입 radio, checkbox, file 등</td>
									</tr>
									<tr>
										<td>opt</td>
										<td>selectbox</td>
									</tr>
									<tr>
										<td>lab</td>
										<td>label</td>
									</tr>
									<tr>
										<td>fid</td>
										<td>fieldset</td>
									</tr>
									<tr>
										<td class="txtcenter">버튼</td>
										<td>btn</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">박스</td>
										<td>box</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">아이콘</td>
										<td>ico</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter" rowspan="2">선</td>
										<td>line_방향</td>
										<td>일반 실선</td>
									</tr>
									<tr>
										<td>line_dot_방향</td>
										<td>점선</td>
									</tr>
									<tr>
										<td class="txtcenter">배경</td>
										<td>bg</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">썸네일 이미지</td>
										<td>thumb</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">페이징</td>
										<td>paging</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">배너</td>
										<td>bnr/banner</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter" rowspan="5">텍스트</td>
										<td>txt</td>
										<td>일반 텍스트</td>
									</tr>
									<tr>
										<td>txt_bar</td>
										<td>구분선 텍스트</td>
									</tr>
									<tr>
										<td>num</td>
										<td>num1, num2, ... : 숫자 사용시 언더바(underscore) 사용 X</td>
									</tr>
									<tr>
										<td>copyright</td>
										<td></td>
									</tr>
									<tr>
										<td>time</td>
										<td>날짜 및 시간</td>
									</tr>
									<tr>
										<td class="txtcenter">강조</td>
										<td>emph</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter" rowspan="2">링크</td>
										<td>link</td>
										<td>일반 링크</td>
									</tr>
									<tr>
										<td>link_more</td>
										<td>더 보기 링크</td>
									</tr>
									<tr>
										<td class="txtcenter">순서</td>
										<td>fst, mid, lat</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">팝업</td>
										<td>popup</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">레이어</td>
										<td>layer</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">광고</td>
										<td>ad</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">스페셜</td>
										<td>spe</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">위젯</td>
										<td>widget_소재명</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">상세 내용</td>
										<td>desc</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">댓글</td>
										<td>cmt</td>
										<td></td>
									</tr>
									</tbody>
								</table>
							</li>
						</ol>
					</li>
					<li>Subfix
						<ol class="typei list_step2">
							<li>하부 기호로서 subfix는 prefix와 함께 부가 설명 용도로 사용한다.(예 : ico_arr_news.gif)</li>
							<li>분류별 subfix 부가설명
								<table cellspacing="0" cellpadding="0">
									<caption>표3-1-2 분류별 Subfix 부가설명</caption>
									<colgroup>
									<col width="100" />
									<col width="150" />
									<col  />
									</colgroup>
									<thead>
									<tr>
										<th scope="col">분류</th>
										<th scope="col">Subfix</th>
										<th scope="col">부가 설명</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td class="txtcenter">공용</td>
										<td>comm</td>
										<td>전역으로만 사용</td>
									</tr>
									<tr>
										<td class="txtcenter">위치변화</td>
										<td>top/mid/bot/left/right</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">순서변화</td>
										<td>fst/lst</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">그림자</td>
										<td>shadow</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">화살표</td>
										<td>arr</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">버튼 상태 변화</td>
										<td>nor</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">방향</td>
										<td>hori/vert</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">카테고리</td>
										<td>cate</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">순위</td>
										<td>rank</td>
										<td></td>
									</tr>
									</tbody>
								</table>
							</li>
						</ol>
					</li>
					<li>Suffix
						<ol class="typei list_step2">
							<li>접미사를 의미하는 것으로, prefix와 함께 부가 설명 용도로 사용하며, 주로 상탸를 나타내는데 사용된다.</li>
							<li>분류별 suffix 부가설명
								<table cellspacing="0" cellpadding="0">
									<caption>표3-1-3 분류별 Suffix 부가설명</caption>
									<colgroup>
									<col width="100" />
									<col width="250" />
									<col  />
									</colgroup>
									<thead>
									<tr>
										<th scope="col">분류</th>
										<th scope="col">Subfix</th>
										<th scope="col">부가 설명</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td class="txtcenter">상태 변화</td>
										<td>_on / _off / _over / _hit / _focus</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">위치 변화</td>
										<td>_top / _mid / _bot / _left / _right</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">순서 변화</td>
										<td>_fst / _lst</td>
										<td></td>
									</tr>
									<tr>
										<td class="txtcenter">이전/다음</td>
										<td>_prev / _next</td>
										<td></td>
									</tr>
									</tbody>
								</table>
							</li>
						</ol>
					</li>
				</ol>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-07-08 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>