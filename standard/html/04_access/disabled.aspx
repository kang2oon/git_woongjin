<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>장애인의 이해 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
</head>
<body id="access_disabled">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>장애인의 이해</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#class">한국 장애인복지법에 의한 장애의 분류</a></li>
						<li><a href="#object">웹 접근성 대상 분류</a></li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<h3 class="mgtop20"><a name="class"><i class="icon-chevron-right"></i> 한국 장애인복지법에 의한 장애의 분류</a></h3>
				<ul class="mgtop10">
					<li><span class="txtsize13 txtstrong">신체적 장애</span>
						<ol>
							<li>외부 신체기능의 장애
								<ol class="typei list_step2">
									<li><span class="txtstrong">지체장애</span> : 절단장애, 관절장애, 지체기능장애, 변형 등의 장애
										<ul class="list_step2">
											<li>한 팔, 한 다리 또는 몸통의 기능에 영속적인 장애가 있는 사람</li>
											<li>한 손의 엄지손가락을 지골(指骨 : 손가락 뼈) 관절 이상의 부위에서 잃은 사람 또는 한 손의 둘째 손가락을 포함한 두 개 이상의 손가락을 모두 제1지골 관절 이상의 
											부위에서 잃은 사람</li>
											<li>한 다리를 리스프랑(Lisfranc : 발등뼈와 발목을 이어주는) 관절 이상의 부위에서 잃은 사람</li>
											<li>두 발의 발가락을 모두 잃은 사람</li>
											<li>한 손의 엄지손가락 기능을 잃은 사람 또는 한 손의 둘째 손가락을 포함한 손가락 두 개 이상의 기능을 잃은 사람</li>
											<li>왜소증으로 키가 심하게 작거나 척추에 현저한 변형 또는 기형이 있는 사람</li>
											<li>지체(肢體)에 위 각 목의 어느 하나에 해당하는 장애정도 이상의 장애가 있다고 인정되는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">뇌병변장애</span> : 뇌의 손상으로 인한 복합적인 장애
										<ul class="list_step2">
											<li>뇌성마비, 외상성 뇌손상, 뇌졸중(腦卒中) 등 뇌의 기질적 병변으로 인하여 발생한 신체적 장애로 보행이나 일상생활의 동작 등에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">시각장애</span> : 시력장애, 시야결손장애
										<ul class="list_step2">
											<li>나쁜 눈의 시력(만국식시력표에 따라 측정된 교정시력을 말한다. 이하 같다)이 0.02 이하인 사람</li>
											<li>좋은 눈의 시력이 0.2 이하인 사람</li>
											<li>두 눈의 시야가 각각 주시점에서 10도 이하로 남은 사람</li>
											<li>두 눈의 시야 2분의 1 이상을 잃은 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">청각장애</span> : 청력장애, 평형기능장애
										<ul class="list_step2">
											<li>두 귀의 청력 손실이 각각 60dB(데시벨) 이상인 사람</li>
											<li>한 귀의 청력 손실이 80dB(데시벨) 이상, 다른 귀의 청력 손실이 40dB(데시벨) 이상인 사람</li>
											<li>두 귀에 들리는 보통 말소리의 명료도가 50퍼센트 이하인 사람</li>
											<li>평형 기능에 상당한 장애가 있는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">언어장애</span> : 언어장애, 음성장애, 구어장애
										<ul class="list_step2">
											<li>음성 기능이나 언어 기능에 영속적으로 상당한 장애가 있는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">안면장애</span> : 안면부의 추상, 함몰, 비후 등 변형으로 인한 장애
										<ul class="list_step2">
											<li>안면 부위의 변형이나 기형으로 사회생활에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
								</ol>
							</li>
							<li>내부기관의 장애
								<ol class="typei list_step2">
									<li><span class="txtstrong">신장장애</span> : 투석치료중이거나 신장을 이식 받은 경우
										<ul class="list_step2">
											<li>신장의 기능부전(機能不全)으로 인하여 혈액투석이나 복막투석을 지속적으로 받아야 하거나 신장기능의 영속적인 장애로 인하여 일상생활에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">심장장애</span> : 일상생활이 현저히 제한되는 심장기능 이상
										<ul class="list_step2">
											<li>심장의 기능부전으로 인한 호흡곤란 등의 장애로 일상생활에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">간장애</span> : 일상생활이 현저히 제한되는 만성·중증의 간 기능 이상
										<ul class="list_step2">
											<li>간의 만성적 기능부전과 그에 따른 합병증 등으로 인한 간기능의 장애로 일상생활에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">호흡기장애</span> : 일상생활이 현저히 제한되는 만성·중증의 호흡기 기능 이상
										<ul class="list_step2">
											<li>폐나 기관지 등 호흡기관의 만성적 기능부전으로 인한 호흡기능의 장애로 일상생활에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">장루&middot;요루장애</span> : 일상생활이 현저히 제한되는 장루&middot;요루
										<ul class="list_step2">
											<li>배변기능이나 배뇨기능의 장애로 인하여 장루(腸瘻) 또는 요루(尿瘻)를 시술하여 일상생활에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">간질장애</span> : 일상생활이 현저히 제한되는 만성&middot;중증의 간질
										<ul class="list_step2">
											<li>간질에 의한 뇌신경세포의 장애로 인하여 일상생활이나 사회생활에 상당한 제약을 받아 다른 사람의 도움이 필요한 사람</li>
										</ul>
									</li>
								</ol>
							</li>
						</ol>
					</li>
					<li><span class="txtsize13 txtstrong">정신적 장애</span>
						<ol>
							<li>발달장애
								<ol class="typei list_step2">
									<li><span class="txtstrong">지적장애</span> : 지능지수와 사회성숙지수가 70 이하인 경우
										<ul class="list_step2">
											<li>정신 발육이 항구적으로 지체되어 지적 능력의 발달이 불충분하거나 불완전하고 자신의 일을 처리하는 것과 사회생활에 적응하는 것이 상당히 곤란한 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">지적장애</span> : 소아청소년 자폐 등 자폐성 장애
										<ul class="list_step2">
											<li>소아기 자폐증, 비전형적 자폐증에 따른 언어·신체표현·자기조절·사회적응 기능 및 능력의 장애로 인하여 일상생활이나 사회생활에 상당한 제약을 받아 다른 사람의 도움이 필요한 사람</li>
										</ul>
									</li>
								</ol>
							</li>
							<li>정신장애
								<ol class="typei list_step2">
									<li><span class="txtstrong">정신장애</span> : 정신분열병, 분열형정동자애, 양극성정동장애, 반복성우울장애
										<ul class="list_step2">
											<li>지속적인 정신분열병, 분열형 정동장애(情動障碍 : 여러 현실 상황에서 부적절한 정서 반응을 보이는 장애), 양극성 정동장애 및 반복성 우울장애에 따른 감정조절·행동·사고 기능 및 능력의 장애로 인하여 일상생활이나 사회생활에 상당한 제약을 받아 다른 사람의 도움이 필요한 사람</li>
										</ul>
									</li>
								</ol>
							</li>
						</ol>
					</li>
				</ul>
				<h3 class="mgtop20"><a name="object"><i class="icon-chevron-right"></i> 웹 접근성 대상 분류</a></h3>
				<div class="info_box mgtop10">
					"웹 접근성 사례 및 지표" 에서 언급되는 대상자 분류표입니다.<br/>
					"한국 장애인복지법에 의한 장애의 분류" 기준으로 총 7 항목으로 분류되며, 웹 접근성 각 지침별 검사항목의 검사방법 및 세부정의를 명확히 하기 위해 구분하였습니다.<br/>
					검사항목에 따라 장애를 세부적으로 분리(시각장애)하거나 그룹화(지적장애)하였습니다.
				</div>
				<ul>
					<li style="list-style:none;" class="mgtop10">
						<ol>
							<li>지체장애
								<ol class="typei list_step2">
									<li>절단장애, 관절장애, 지체기능장애, 변형 등의 장애
										<ul class="list_step2">
											<li>한 팔, 한 다리 또는 몸통의 기능에 영속적인 장애가 있는 사람</li>
											<li>한 손의 엄지손가락을 지골(指骨 : 손가락 뼈) 관절 이상의 부위에서 잃은 사람 또는 한 손의 둘째 손가락을 포함한 두 개 이상의 손가락을 모두 제1지골 관절 이상의 부위에서 잃은 사람</li>
											<li>한 다리를 리스프랑(Lisfranc : 발등뼈와 발목을 이어주는) 관절 이상의 부위에서 잃은 사람</li>
											<li>두 발의 발가락을 모두 잃은 사람</li>
											<li>한 손의 엄지손가락 기능을 잃은 사람 또는 한 손의 둘째 손가락을 포함한 손가락 두 개 이상의 기능을 잃은 사람</li>
											<li>왜소증으로 키가 심하게 작거나 척추에 현저한 변형 또는 기형이 있는 사람</li>
											<li>지체(肢體)에 위 각 목의 어느 하나에 해당하는 장애정도 이상의 장애가 있다고 인정되는 사람</li>
										</ul>
									</li>
								</ol>
							</li>
							<li>지적장애
								<ol class="typei list_step2">
									<li><span class="txtstrong">뇌병변장애</span> : 뇌의 손상으로 인한 복합적인 장애
										<ul class="list_step2">
											<li>뇌성마비, 외상성 뇌손상, 뇌졸중(腦卒中) 등 뇌의 기질적 병변으로 인하여 발생한 신체적 장애로 보행이나 일상생활의 동작 등에 상당한 제약을 받는 사람</li>
										</ul>
									</li>
									<li><span class="txtstrong">뇌병변장애</span> : 지능지수와 사회성숙지수가 70 이하인 경우
										<ul class="list_step2">
											<li>정신 발육이 항구적으로 지체되어 지적 능력의 발달이 불충분하거나 불완전하고 자신의 일을 처리하는 것과 사회생활에 적응하는 것이 상당히 곤란한 사람</li>
										</ul>
									</li>
								</ol>
							</li>
							<li>시각장애
								<ol class="typei list_step2">
									<li>전맹, 저시력, 색맹 등의 장애
										<ul class="list_step2">
											<li>나쁜 눈의 시력(만국식시력표에 따라 측정된 교정시력을 말한다. 이하 같다)이 0.02 이하인 사람</li>
											<li>좋은 눈의 시력이 0.2 이하인 사람</li>
											<li>두 눈의 시야가 각각 주시점에서 10도 이하로 남은 사람</li>
											<li>두 눈의 시야 2분의 1 이상을 잃은 사람</li>
										</ul>
									</li>
								</ol>
							</li>
							<li>청각장애
								<ol class="typei list_step2">
									<li style="list-style:none;">
										<ul class="list_step2">
											<li>두 귀의 청력 손실이 각각 60dB(데시벨) 이상인 사람</li>
											<li>한 귀의 청력 손실이 80dB(데시벨) 이상, 다른 귀의 청력 손실이 40dB(데시벨) 이상인 사람</li>
											<li>두 귀에 들리는 보통 말소리의 명료도가 50% 이하인 사람</li>
											<li>평형 기능에 상당한 장애가 있는 사람</li>
										</ul>
									</li>
								</ol>
							</li>
							<li>광과민성 발작(간질장애)
								<ol class="typei list_step2">
									<li>일상생활이 현저히 제한되는 만성·중증의 간질
										<ul class="list_step2">
											<li>간질에 의한 뇌신경세포의 장애로 인하여 일상생활이나 사회생활에 상당한 제약을 받아 다른 사람의 도움이 필요한 사람</li>
										</ul>
									</li>
								</ol>
							</li>
						</ol>
					</li>
				</ul>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-07-09 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>