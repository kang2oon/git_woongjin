<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>WJS솔루션 < SAP B-one ERP < IT서비스&amp;솔루션 < 사업분야</title>
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
					<p><a href="/">Home</a> &gt; <a href="/business/a_one_erp1.aspx">사업분야</a> &gt; <a href="/business/a_one_erp1.aspx">IT서비스&amp;솔루션</a> &gt; <span class="txtstrong">SAP B-one ERP</span></p>
				</div>
				<div id="title" style="background:url('/images/business/h2_bg_sap_bone.gif');">
					<h2><img src="/images/business/h2_sap_bone.gif" alt="SAP B-one ERP 국내 1등 파트너사 SAP Business One은 급성장하는 중소기업을 위한 통합 비지니스 관리 솔루션입니다."/></h2>
					<div style="position:absolute;top:155px;left:10px;">
						<a href="http://b1help.woongjin.com/login/gologin.asp" target="_blank"><img src="/images/business/btn_bone_helpcenter.gif" alt="헬프센터 바로가기"/></a>
					</div>
				</div>
				<!--#include file="tab_b_one.aspx"-->
				
				<div id="stab">
					<ul class="clearfix">
						<li class="tab selected"><h3><a href="javascript:void(0);" onclick="switchTab(1); return false"><img src="/images/business/stab_bone301_o.gif" alt="전체프로세스"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(2); return false"><img src="/images/business/stab_bone302_n.gif" alt="코이모듈솔루션맵"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(3); return false"><img src="/images/business/stab_bone303_n.gif" alt="운영관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(4); return false"><img src="/images/business/stab_bone304_n.gif" alt="재무관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(5); return false"><img src="/images/business/stab_bone305_n.gif" alt="영업관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(6); return false"><img src="/images/business/stab_bone306_n.gif" alt="CRM관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(7); return false"><img src="/images/business/stab_bone307_n.gif" alt="수출관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(8); return false"><img src="/images/business/stab_bone308_n.gif" alt="구매관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(9); return false"><img src="/images/business/stab_bone309_n.gif" alt="수입관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(10); return false"><img src="/images/business/stab_bone310_n.gif" alt="재고관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(11); return false"><img src="/images/business/stab_bone311_n.gif" alt="생산관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(12); return false"><img src="/images/business/stab_bone312_n.gif" alt="원가관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(13); return false"><img src="/images/business/stab_bone313_n.gif" alt="인사관리"/></a></h3></li>
						<li class="tab"><h3><a href="javascript:void(0);" onclick="switchTab(14); return false"><img src="/images/business/stab_bone314_n.gif" alt="웹경영자정보"/></a></h3></li>
					</ul>
					
					<div id="tcont_1">
						<h4>전체 프로세스</h4>
						<img src="/images/business/img_bone_erp3_011.gif" alt="전체 프로세스를 프로세스 순서에 맞게 도식화한 이미지"/>
					</div>
					
					<div id="tcont_2" style="display:none;">
						<h4>코이모듈솔루션맵</h4>
						<img src="/images/business/img_bone_erp3_021.gif" alt="확장성과 편리성을 가진 기능들로 구성되어 있는 코이모듈솔루션맵을 도식화한 이미지입니다.
기능으로는 재무관리, 판매관리, 서비스관리, 구매관리, 재고관리, 자금관리, 생산관리, 인사관리, 거래처관리, 영업기획이 있습니다.
소프트웨어 개발 키드(UI API, DI API, SDK), SAP Internet Sales, Other SAP and 3rd Party Software의 확장성이 있습니다.
경영보고, 드래그&amp;릴레이, 데이터 검색기능, 경고관리WorkFlow, 사용자인터페이스의 편리성이 있습니다."/>
					</div>
					
					<div id="tcont_3" style="display:none;">
						<h4>운영관리</h4>
						<img src="/images/business/img_bone_erp3_031.gif" alt="외부연계, 기준정보, 내부정보로 구분하여 운영관리 프로세스를 도식화한 이미지입니다.
계정과목들의 기준정보들을 가지고 영업, 구매, 재고, 회계, 인사의 내부정보로 이용하게 됩니다."/>
					</div>
					
					<div id="tcont_4" style="display:none;">
						<h4>재무관리</h4>
						<img src="/images/business/img_bone_erp3_041.gif" alt="외부연계, 재무관리, 내부연계로 구분하여 재무관리 프로세스를 도식화한 이미지입니다.
외부 연계의 현업전표를 가지고 재무관리를 통해 영업, 생산, 구매, 인사 전산매체로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_042.gif" alt="전표등록 및 손익계산서(결산) 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>인사 급여관리의 월말 급여전표 자동 Posting</dd>
								<dd>부서별, 사업장별 손익평가 등 경영정보 산출</dd>
								<dd>재무회계 관련 모든 Data의 통합관리</dd>
								<dt>특징 및 기대효과</dt>
								<dd>영업관리의 매출계산서와 구매관리의 매입계산서의 자동전표 Posting으로 인한 업무감소</dd>
								<dd>Real Time 마감이 가능하며 자동전표 발행과 정합성/적시성/전사적 통합성으로 재무회계, 자금관리, 관리회계 효율성 향상</dd>
								<dd>한국적인 회계원장의 양식을 지원하여 보다 편안한 시스템을 사용</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_5" style="display:none;">
						<h4>영업관리</h4>
						<img src="/images/business/img_bone_erp3_051.gif" alt="외부연계, 재무관리, 내부연계로 구분하여 재무관리 프로세스를 도식화한 이미지입니다.
외부 연계의 거래명세서를 가지고 영업/판매 관리를 통해 수출관리, 재고관리, 클레임관리, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_052.gif" alt="연 판매계획 관리 및 매출 분석 – 기획 파이프라인 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>판매계획 수립 및 판매실적 분석
									<ul>
										<li>판매계획/월실행 계획관리</li>
										<li>고객별, 품목별 등의 조건으로 판매계획 수립 및 분석지원</li>
									</ul>
								</dd>
								<dd>견적, 계약, 판매, 수금 등 영업업무 종합관리</dd>
								<dd>일일 매출집계, 판매현황 분석</dd>
								<dd>제품 수불현황 관리 및 수불원장 조회</dd>
								<dt>특징 및 기대효과</dt>
								<dd>고객의 계약이력관리를 통한 고객이탈, 신규 단가인상, 보다 정확한 고객분석 가능</dd>
								<dd>영업계획에 따른 목표관리 및 실적평가</dd>
								<dd>재고정보시스템 및 조기경보 시스템을 활용한 사전 경영의사결정 지원<br/>영업통계 및 경영정보 즉시 제공</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_6" style="display:none;">
						<h4>CRM관리</h4>
						<img src="/images/business/img_bone_erp3_061.gif" alt="외부연계, CRM관리, 내부연계로 구분하여 CRM관리 프로세스를 도식화한 이미지입니다.
외부 연계의 전화/팩스/이메일, 서비스 리포트를 가지고 CRM관리를 통해 영업관리, 재고관리, 판매계획, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_062.gif" alt="서비스호출 및 영업기회 등록 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>판매계획 수립 및 판매실적 분석</dd>
								<dd>영업기획의 발굴에서 잠재고객별, 품목별, 영업사원별 기획을 분석하고 진척관리</dd>
								<dd>콜센터 운영에 필요한 불만접수와 해결내용 및 비용에 이르기까지 모든 업무를 운영할 수 있도록 지원</dd>
								<dd>고객의 문제해결 노하우를 지속적으로 축적하여 문의 및 접수 즉시 응대할 수 있는 지식기반 솔루션을 지원</dd>
								<dt>특징 및 기대효과</dt>
								<dd>영업기획 파이프라인을 통한 성공 가능성을 분석하여 제시</dd>
								<dd>시리얼번호 추적에 의한 관리를 완벽하게 제공하여 철저한 고객불만 관리</dd>
								<dd>상담원의 미결 및 연체에 대한 건수를 실시간으로 확인 가능하며 그것을 바탕으로 고객만족 극대화를 지원</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_7" style="display:none;">
						<h4>수출관리</h4>
						<img src="/images/business/img_bone_erp3_071.gif" alt="외부연계, 수출관리, 내부연계로 구분하여 수출관리 프로세스를 도식화한 이미지입니다.
수출관리를 통해 판매오더, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_072.gif" alt="판매오더 및 Local L/C수출 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>수출 관련된 문서관리(Office, Local L/C)</dd>
								<dd>AP송장 처리시 회계관련 모듈과 실시간 연동 처리</dd>
								<dt>특징 및 기대효과</dt>
								<dd>Local L/C 수출 장표관리</dd>
								<dd>Local L/C Amend 이력관리</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_8" style="display:none;">
						<h4>구매관리</h4>
						<img src="/images/business/img_bone_erp3_081.gif" alt="외부연계, 구매관리, 내부연계로 구분하여 구매관리 프로세스를 도식화한 이미지입니다.
외부 연계의 전화/팩스/이메일, 기업명세서, 세금계산서를 가지고 구매관리를 통해 구매요청자, 판매오더, 재고관리, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_082.gif" alt="구매요청 및 미결현황 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>각 공급처 별 입고/출고/재고 정보 실시간 제공</dd>
								<dd>구매 등의 기간 정보시스템과의 연계를 통한 업무에 대한 전반적인 관리</dd>
								<dd>입고/출고 등의 물류 정보와의 연동</dd>
								<dt>특징 및 기대효과</dt>
								<dd>소요 예측을 통한 조달력 강화</dd>
								<dd>생산계획 변동에 따른 탄력적 대응</dd>
								<dd>영업 및 생산지시 자료를 통한 효율적인 관리</dd>
								<dd>재고 리스크 최소화</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_9" style="display:none;">
						<h4>수입관리</h4>
						<img src="/images/business/img_bone_erp3_091.gif" alt="외부연계, 수입관리, 내부연계로 구분하여 수입관리 프로세스를 도식화한 이미지입니다.
외부 연계의 선적서류, 관세청에서 수입관리를 통해 구매오더, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_092.gif" alt="판매오더 및 Local L/C 수출 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>수출 관련된 문서관리(Office, Local L/C)</dd>
								<dd>AP송장 처리시 회계관련 모듈과 실시간 연동 처리</dd>
								<dt>특징 및 기대효과</dt>
								<dd>Local L/C 수출 장표관리</dd>
								<dd>Local L/C Amend 이력관리</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_10" style="display:none;">
						<h4>재고관리</h4>
						<img src="/images/business/img_bone_erp3_101.gif" alt="외부연계, 수입관리, 내부연계로 구분하여 수입관리 프로세스를 도식화한 이미지입니다.
외부 연계의 고객사/대리점, End User, 공급처에서 재고관리를 통해 재고 데이터, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_102.gif" alt="품목 마스터데이터 및 품목별 재고전기리스트 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>재고실사를 통한 창고별 재고수량 조정</dd>
								<dd>작업실적으로 출고 할당된 소요자재의 개별 일괄 출고</dd>
								<dd>재고실사를 통한 창고별 재고수량 조정</dd>
								<dd>거래처 및 거래처 이력관리</dd>
								<dt>특징 및 기대효과</dt>
								<dd>생산계획 정보 활용을 통한 신속한 자재조달</dd>
								<dd>기간별, 품목별 구매내역 집계 및 분석을 통한 실질적인 구매계획 수립</dd>
								<dd>구매계획 승인에 따라 업체별 발주서로 자동 전환</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_11" style="display:none;">
						<h4>생산관리</h4>
						<img src="/images/business/img_bone_erp3_111.gif" alt="물류정보, 생산관리, 내부연계로 구분하여 생산관리 프로세스를 도식화한 이미지입니다.
물류정보의 MRP 관련정보, 판매오더, 구매관리에서 생산관리를 통해 판매계획, 제조원가현황, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_112.gif" alt="BOM 정의 및 BOM 이력관리 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>제지산업 관련 BOM 유형별 관리</dd>
								<dd>생산속도, 작업지폭, 생산효율, 생산성을 마스터로 관리</dd>
								<dd>생산 BOM, 판매 BOM 및 조립 BOM, BOM 팜플릿 관리</dd>
								<dd>수동, 백플러시 출고방법 관리</dd>
								<dd>가격리스트를 고려한 제품가격 확정</dd>
								<dt>특징 및 기대효과</dt>
								<dd>다양한 형태의 BOM관리 기능</dd>
								<dd>BOM의 유연성 확보(BOM 기본정보 활용)</dd>
								<dd>품목에 대한 유연한 정보관리(상태, 품목위치, 기타관리) 및 조정기능 정의</dd>
								<dd>BOM 용도 확장기능</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_12" style="display:none;">
						<h4>원가관리</h4>
						<img src="/images/business/img_bone_erp3_121.gif" alt="외부연계, 원가관리, 내부연계로 구분하여 원가관리 프로세스를 도식화한 이미지입니다.
원가관리를 통해 영업, 생산, 구매, 인사, 회계 및 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_122.gif" alt="실제원가현황-ITEM별 및 재고수출부, 손익센터정의 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>생산활동과 연계한 실제원가 산출</dd>
								<dd>원가요소, 원가유형, 배부기준 등 설정</dd>
								<dd>생산, 자재, 영업, 회계, 인사시스템과의 연동</dd>
								<dd>제품별/품목그룹별 원가 산출</dd>
								<dt>특징 및 기대효과</dt>
								<dd>제품별 원가차이 분석(원가센터별로 Drill Down)</dd>
								<dd>특성별 손익관리로 생산/영업에 전략정보 제공</dd>
								<dd>부서별 손익관리로 책임경영 실현</dd>
								<dd>Resource 소비의 투명성 확보</dd>
								<dd>효율적인 신제품 개발 방향 수립</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_13" style="display:none;">
						<h4>인사관리</h4>
						<img src="/images/business/img_bone_erp3_131.gif" alt="인사/급여관리, 내부연계로 구분하여 인사관리 프로세스를 도식화한 이미지입니다.
인사/급여관리를 통해 조직, 회계전표로 내부연계가 됩니다."/><img src="/images/business/img_bone_erp3_132.gif" alt="인사 마스터관리, 기간별 전표현황, 그룹발령 캡쳐 이미지"/>
						<div class="hidden_txt">
							<dl>
								<dt>주요기능</dt>
								<dd>자동 급여계산, 개인별 계산식에 의한 급여관리</dd>
								<dd>다양한 근태관련 Report 제공</dd>
								<dd>완벽한 관련 세무서식 처리</dd>
								<dd>원터치로 연말정산 가능</dd>
								<dd>수시로 변경되는 조직에 대한 변경과 버전의 완벽 데이터 처리</dd>
								<dt>특징 및 기대효과</dt>
								<dd>사용자 편의성과 기업특성에 맞는 환경설정</dd>
								<dd>카드리더기와 연동하여 정확한 근태현황 관리 및 근태이력 파악 가능</dd>
							</dl>
						</div>
					</div>
					
					<div id="tcont_14" style="display:none;">
						<h4>웹경영자정보</h4>
						<img src="/images/business/img_bone_erp3_141.gif" alt="웹경영자정보 이미지"/>
						<div class="hidden_txt">
							<p>구매, 영업, 생산, 재무로 구분되어 있으며, 구매는 원재료 수불 및 단가 추이분석, 영업은 다차원 매출분석 현황, 고객그룹별/지종별 매출현황, 생산은 월별 제품수불추이, 생산종합 현황, 제품별 제조원가 현황, 재무는 창고별/상태별 
							제품재고현황, 고객그룹별/거래선별 매출현황, 월별 손익 현황, 월별 전체/직군별 인건비 현황을 확인할 수 있습니다.</p>
							<dl>
								<dt>주요기능</dt>
								<dd>구매, 영업, 생산, 재무관점의 주요 경영자 정보 제공</dd>
								<dd>홈페이지에서 EIS 연계</dd>
								<dd>소스레벨의 보안</dd>
							</dl>
						</div>
					</div>

				</div>
				
			</div>
		</div>
		
		<!--#include file="/inc/footer.aspx"-->
	</div>

</body>
</html>