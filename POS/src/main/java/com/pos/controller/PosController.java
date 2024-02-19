package com.pos.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cleopatra.json.JSONArray;
import com.cleopatra.json.JSONObject;
import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.DataResponse;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.pos.Vo.CashVo;
import com.pos.Vo.ClientVo;
import com.pos.Vo.MemberVo;
import com.pos.Vo.ProductVo;
import com.pos.Vo.SalesPayVo;
import com.pos.Vo.SalesProdVo;
import com.pos.Vo.SalesVo;
import com.pos.service.CashService;
import com.pos.service.ClientService;
import com.pos.service.MemberService;
import com.pos.service.ProductService;
import com.pos.service.SalesService;

@Controller
public class PosController {
	
	private static final int String = 0;

	@Autowired
	MemberService memService;
	
	@Autowired
	ProductService prodService;
	
	@Autowired
	SalesService salService;
	
	@Autowired
	CashService cashService;
	
	@Autowired
	ClientService cliService;
	
	// 포스메인 페이지 호출
	@RequestMapping(value="/PosMain.do", method = RequestMethod.GET)
	public UIView posMain(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		return new UIView("/ui/PosMain.clx");
	}
	
	// 바코드 입력시 해당 상품정보 반환
	@RequestMapping(value="/srcProduct.do", method = RequestMethod.POST)
	public JSONDataView srcProduct(HttpServletRequest req, HttpServletResponse res, DataResponse dataRes,
							DataRequest dataReq, ProductVo prodVo) throws IOException {
		
		prodVo.setBAR_CODE(dataReq.getParameter("BAR_CODE"));
		System.out.println(dataReq.getParameter("BAR_CODE"));
//		prodVo.setPROD_CD(dataReq.getParameter("PROD_CD"));
		Map<String, Object> srcBarCode = prodService.srcProductByBarCode(prodVo);
		
		// clx 데이터셋에 보내주기
		dataReq.setResponse("sellItem", srcBarCode);
		
		return new JSONDataView();
	}
	
	// 계산 버튼 클릭시 발생하는 이벤트
	@RequestMapping(value = "/calculate.do", method = RequestMethod.POST)
	public JSONDataView calculate(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq, MemberVo memVo
								, SalesVo salVo, SalesPayVo salPayVo, SalesProdVo salProVo, CashVo cashVo){
		
		JSONObject jsonObj = dataReq.getRequestObject();
		// 판매관련 + 현금일시 시재금 TB insert
		salService.calculateSalInsert(jsonObj, salVo, salPayVo, salProVo, cashVo);
		
		return new JSONDataView();
	}
	
	// POS 화면에서 회원검색 클릭시
	@RequestMapping(value="/srcMemInfo.do", method = {RequestMethod.GET ,RequestMethod.POST})
	public JSONDataView test( HttpServletRequest req, HttpServletResponse res, DataRequest dataReq, MemberVo memVo, ProductVo prodVo) throws Exception {
		
		// 회원정보 검색
		List<MemberVo> srcMemInfo = memService.srcMemInfo(memVo);
		
		dataReq.setResponse("memberInfo", srcMemInfo);
		return new JSONDataView();
	}
	
	// 회원관리 페이지 등록버튼 클릭시 insert
	//POS 화면에서 약식 회원정보 insert
	@RequestMapping(value = "/addMember.do", method = RequestMethod.POST)
	public JSONDataView addMember(HttpServletRequest req, HttpServletResponse res, MemberVo memVo, DataRequest dataReq) {
		
		// 약식 신규가입 후 가입한 회원 정보 받아오기
		List<MemberVo> lastAddMember = memService.addMember(memVo);
		
		return new JSONDataView();
	}
	
	// 판매관리 페이지 호출
	@RequestMapping(value="/PosSalesManagement.do", method = RequestMethod.GET)
	public UIView posSalesManagement(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		return new UIView("/ui/PosSalesManagement.clx");
	}
	
	// 조회버튼 클릭시 조회기능 + 조회조건 구분
	@RequestMapping(value = "/salesSrcBtnClick.do", method = RequestMethod.POST)
	public JSONDataView SalesSrcBtnClick(DataRequest dataReq, MemberVo memVo, SalesVo salVo
										, SalesProdVo salProdVo, SalesPayVo salPayVo)throws Exception{
		
		// 판매구분, 전화번호, 바코드번호, 시작날짜~마감날짜(YYYY-MM-DD HH:mm)
		Map<String, String> srcItems = new HashMap<String, String>();
		srcItems.put("SALES_TY",dataReq.getParameter("SALES_TY"));
		srcItems.put("MOB_PH_NO",dataReq.getParameter("MOB_PH_NO"));
		srcItems.put("BAR_CODE",dataReq.getParameter("BAR_CODE"));
		srcItems.put("sDate",dataReq.getParameter("sDate"));
		srcItems.put("sTime",dataReq.getParameter("sTime"));
		srcItems.put("eDate",dataReq.getParameter("eDate"));
		srcItems.put("eTime",dataReq.getParameter("eTime"));
		
		// 전표내역 list
		List salesList = salService.srcBtnClickSales(srcItems);
		dataReq.setResponse("recipe", salesList);
		
		// 판매상품내역 list
//		List<SalesVo> sellItemList = salService.srcBtnClickSalesProduct(srcItems);
		
		return new JSONDataView();
	}
	// 전표내역 클릭시 상품내역 & 판매금액 반환
	@RequestMapping(value = "/recipeDetailClick.do", method = RequestMethod.POST)
	public JSONDataView recipeDetailClick(DataRequest dataReq, DataResponse dataRes, MemberVo memVo, SalesProdVo salProdVo)throws Exception{
		
		Map<String, String> srcItems = new HashMap<String, String>();
		srcItems.put("SALES_SER_NO", dataReq.getParameter("SALES_SER_NO"));
		
		// 해당 전표내역의 상품내역 & 금액 반환
		List<SalesVo> sellItemList = salService.srcBtnClickSalesProduct(srcItems);
		dataReq.setResponse("sellItem", sellItemList);
		
		return new JSONDataView();
	}
	
	// 상품내역 선택취소 클릭시 취소구분 update 후 새로운영수증 발급(?)
	@RequestMapping(value = "/productCancelClick.do", method = RequestMethod.POST)
	public JSONDataView productCancelClick(DataRequest dataReq, SalesVo salVo, SalesProdVo salProdVo
					,SalesPayVo salPayVo, CashVo cashVo)throws Exception{
		
		JSONObject jsonObj = dataReq.getRequestObject();
		// 취소 서비스 
		salService.productCancel(jsonObj, salProdVo, cashVo);
		
		// 취소한 recipe 다시 select 후 해당 행만 update
		Map<String, String> recipeSalesAmt = salService.selectUpdateRecipe(jsonObj, salPayVo);
		dataReq.setResponse("recipe", recipeSalesAmt);
		
		return new JSONDataView();
	}
	
	
	// 상품관리 페이지 호출
	@RequestMapping(value="/PosProductRegist1.do", method = RequestMethod.GET)
	public UIView posProductRegist1(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		return new UIView("/ui/PosProductRegist1.clx");
	}
	
	// 상품관리 페이지 진입시 상품코드 count +1 반환
	@RequestMapping(value = "/productPageInit.do", method = RequestMethod.POST)
	public JSONDataView productPageInit(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		
		// select to_char(count(*))
		String prodCd = prodService.getProdCnt();
		dataReq.setParameter("PROD_CD", prodCd);
		
		return new JSONDataView();
	}
	
	// 등록버튼 클릭시 입력된 값 상품 TB insert
	@RequestMapping(value = "/productInsert.do", method = RequestMethod.POST)
	public JSONDataView productInsert(DataRequest dataReq, ProductVo prodVo) {
		
		
//		prodVo.setPROD_CD(dataReq.getRequestObject().getString("PROD_CD"));
//		prodVo.setPROD_CLS_CD(dataReq.getRequestObject().getString("PROD_CLS_CD"));
//		prodVo.setPROD_NM(dataReq.getRequestObject().getString("PROD_NM"));
//		prodVo.setPROD_ENG_NM(dataReq.getRequestObject().getString("PROD_ENG_NM"));
//		prodVo.setORIG_NAT(dataReq.getRequestObject().getString("ORIG_NAT"));
//		prodVo.setPURC_PR(dataReq.getRequestObject().getString("PURC_PR"));
//		prodVo.setSELL_PR(dataReq.getRequestObject().getString("SELL_PR"));
//		prodVo.setBAR_CODE(dataReq.getRequestObject().getString("BAR_CODE"));
//		prodVo.setCLIENT_NO(dataReq.getRequestObject().getString("CLIENT_NO"));
//		prodVo.setCOLOR(dataReq.getRequestObject().getString("COLOR"));
//		prodVo.setSIZE(dataReq.getRequestObject().getString("SIZE"));
//		prodVo.setSALE_OR_NOT(dataReq.getRequestObject().getString("SALE_OR_NOT"));
//		prodVo.setSALE_PR(dataReq.getRequestObject().getString("SALE_PR"));
//		prodVo.setTAXAT_TY(dataReq.getRequestObject().getString("TAXAT_TY"));
//		prodVo.setMEM_POINT(dataReq.getRequestObject().getString("MEM_POINT"));
		
		// 거래처명으로 거래처 번호 가져오기
//		String clientNm = prodVo.getCLIENT_NO();
//		prodVo.setCLIENT_NO(cliService.getClientNoByClientNm(clientNm));
		
		// 상품 TB insert
		prodService.productInsert(prodVo);
		
		return new JSONDataView();
	}
	
	// 상품관리1 -> 거래처 검색버튼 클릭 -> 상품관리2 popup
	@RequestMapping(value="/PosProductRegist2.do", method = RequestMethod.GET)
	public UIView posProductRegist2(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		return new UIView("/ui/PosProductRegist2.clx");
	}
	
	// 상품관리2 거래처 검색시 like 거래처로 값 반환
	@RequestMapping(value = "/clientSearch.do", method = RequestMethod.POST)
	public JSONDataView clientSearch(DataRequest dataReq, ClientVo cliVo) {
		
		cliVo.setCLIENT_NM(dataReq.getParameter("CLIENT_NM"));
		List<ClientVo> clientNmList =  cliService.searchClient(cliVo);
		
		return new JSONDataView();
	}
	
	// 거래처관리 페이지 호출
	@RequestMapping(value="/PosAccountManagement.do", method = RequestMethod.GET)
	public UIView posAccountManagement(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		return new UIView("/ui/PosAccountManagement.clx");
	}
	
	// 거래처관리 페이지 진입시 거래처번호 count +1 반환
	@RequestMapping(value = "/clientPageInit.do", method = RequestMethod.POST)
	public JSONDataView clientPageInit(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		String clientCnt = cliService.getClientCnt();
		Map<String, String> clientNo = new HashMap<String, String>();
		clientNo.put("CLIENT_NO", clientCnt);
		
		dataReq.setResponse("clientNo", clientNo);
		return new JSONDataView();
	}
	
	// 등록버튼 클릭시 insert
	@RequestMapping(value = "/clientInsert.do", method = RequestMethod.POST)
	public JSONDataView clientInsert(DataRequest dataReq, ClientVo cliVo) {
		
		cliService.clientInsert(cliVo);
		
		return new JSONDataView();
	}
	
	// 시재금 페이지 호출
	@RequestMapping(value="/PosMoney.do", method = RequestMethod.GET)
	public UIView posMoney(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		return new UIView("/ui/PosMoney.clx");
	}
	
	// 시재금 페이지 진입시 현재 잔액 표시
	@RequestMapping(value = "/vaultInit.do", method = RequestMethod.POST)
	public JSONDataView valutInit(DataRequest dataReq, CashVo cashVo) {
		
		// 시재금 최종잔액 반환
		// 현재 에러는 나지 않으나 변수에 null 값이 들어옴
		int amt = cashService.getAmtInit();
		dataReq.setResponse("totCash", amt);
		return new JSONDataView();
	}
	
	// 입금하기 / 출금하기 버튼 클릭시 (DEP_PAY_TY 으로 조건문)
	@RequestMapping(value = "/vaultCashInOut.do", method = RequestMethod.POST)
	public JSONDataView valutInOut(DataRequest dataReq, CashVo cashVo) {
		
//		cashVo.setTER_SER_NO(dataReq.getRequestObject().getString("TER_SER_NO"));
//		cashVo.setDEP_PAY_TY(dataReq.getRequestObject().getString("DEP_PAY_TY"));
//		cashVo.setCONTENTS(dataReq.getRequestObject().getString("CONTENTS"));
//		cashVo.setAMT(dataReq.getRequestObject().getString("AMT"));
		
		// 입출금 내역 insert
		cashService.vaultCashInOut(cashVo);
		
		return new JSONDataView();
	}
	
	// 회원관리 페이지 호출
	@RequestMapping(value="/PosCust.do", method = RequestMethod.GET)
	public UIView posCust(HttpServletRequest req, HttpServletResponse res, DataRequest dataReq) throws Exception {
		return new UIView("/ui/PosCust.clx");
	}
}
	

