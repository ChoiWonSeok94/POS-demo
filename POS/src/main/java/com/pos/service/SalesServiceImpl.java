package com.pos.service;

import java.util.List;
import java.util.Map;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleopatra.json.JSONArray;
import com.cleopatra.json.JSONObject;
import com.pos.Vo.CashVo;
import com.pos.Vo.SalesPayVo;
import com.pos.Vo.SalesProdVo;
import com.pos.Vo.SalesVo;
import com.pos.dao.CashDao;
import com.pos.dao.SalesDao;

@Service
public class SalesServiceImpl implements SalesService{

	@Autowired
	SalesDao salDao;
	
	@Autowired
	CashDao cashDao;
	
	@Override
	public void calculateSalInsert(JSONObject jsonObj, SalesVo salVo, SalesPayVo salPayVo, SalesProdVo salProVo, CashVo cashVo) {
		
		int cnt = 0;
		JSONArray jsonArray = jsonObj.getJSONArray("sellItem");
		for(int i=0 ; i < jsonArray.length() ; i++) {
			
			String serNo = i + 1 + ""; // 일련번호
			salProVo.setSER_NO(serNo);
			salProVo.setPROD_CD(jsonArray.getJSONObject(i).get("BAR_CODE").toString());
//			salProVo.setpro(jsonArray.getJSONObject(i).get("PROD_NM"));
			salProVo.setQTY(jsonArray.getJSONObject(i).get("QTY").toString());
			salProVo.setSALES_PR(jsonArray.getJSONObject(i).get("SELL_PR").toString());
//			salProVo.set(jsonArray.getJSONObject(i).get("ASELL_PR").toString());
			salProVo.setSALE_AMT(jsonArray.getJSONObject(i).get("SALE_PR").toString());
//			 판매상품에는 SALES_AMT가 한개 물품 * 수량의 합산 금액임.
			salProVo.setSALES_AMT(jsonArray.getJSONObject(i).get("PROD_TBL_SALES_AMT").toString());
			
			if(i == 0) {
				// 최초 한번만 리스트에 담아서 insert
				salProVo.setTRANS_TY(jsonObj.getString("TRANS_TY"));
				String memTy = jsonObj.getString("MEMB_TY").toString();
				if(memTy.equals("1")) {
					salVo.setMEMB_SER_NO(jsonObj.getString("MEMB_SER_NO"));
					salVo.setMEMB_TY(jsonObj.getString("MEMB_TY"));
				}else {
					salVo.setMEMB_SER_NO("0");
					salVo.setMEMB_TY(jsonObj.getString("MEMB_TY"));
				}
				salVo.setCANC_TY("0");
				salVo.setTER_NO("1");
				
				// 판매 테이블 insert
				cnt = salDao.calculateSalInsert(salVo);
				
				salPayVo.setSALES_SER_NO(salVo.getSALES_SER_NO());
				salPayVo.setSER_NO(salDao.countPayTbl());
				salPayVo.setSALES_AMT(jsonObj.getString("PAY_TBL_SALES_AMT"));
				salPayVo.setSALES_TY(jsonObj.getString("TRANS_TY"));
				// 판매결제 테이블 insert
				salDao.calculateSalPayInsert(salPayVo);
			}
			salProVo.setSALES_SER_NO(salVo.getSALES_SER_NO());
			// 판매상품 테이블 insert
			salDao.calculateSalProdInsert(salProVo);
		}
		// 판매구분이 현금("1")일 때 시재금 insert
		if(jsonObj.getString("TRANS_TY").equals("1")) {
			cashVo.setTER_SER_NO("1");
			cashVo.setDEP_PAY_TY("1");
			cashVo.setCONTENTS("판매일련번호 = " + salPayVo.getSALES_SER_NO());
			cashVo.setAMT(jsonObj.getString("PAY_TBL_SALES_AMT"));
			cashDao.vaultCashInOut(cashVo);
		}
	}

	@Override
	public List<SalesProdVo> productDetailSalesAmt(SalesProdVo salProdVo) {
		
		return salDao.productDetailSalesAmt(salProdVo);
	}

	@Override
	public void productCancel(JSONObject jsonObj, SalesProdVo salProdVo, CashVo cashVo) {

		JSONArray jsonArray = jsonObj.getJSONArray("sellItem");
		salProdVo.setSALES_SER_NO(jsonObj.getString("SALES_SER_NO"));
		int totalAmt = 0;
		String contents = "";
		for(int i=0 ; i < jsonArray.length() ; i++) {
			salProdVo.setSER_NO(jsonArray.getJSONObject(i).get("SER_NO").toString());
			
			// 갔다 오면서 selectKey before로 취소가 3이였는지 받아오기
			salDao.productCancel(salProdVo);
			
			if(i == 0) {
				contents += "salesSerNo = " + jsonObj.getString("SALES_SER_NO").toString() + ", serNo = ";
			}
			if(salProdVo.getTRANS_TY().toString().equals("1")) {
				salProdVo.setSALES_AMT(jsonArray.getJSONObject(i).get("SALES_AMT").toString());
				
				contents += jsonArray.getJSONObject(i).get("SER_NO").toString() + " ";
				totalAmt += Integer.parseInt(jsonArray.getJSONObject(i).get("SALES_AMT").toString());
				salDao.updateSalesTblSalesAmt(salProdVo);
			}
			// 이후에 판매일련번호의 count(*) 과 취소구분이 3인 count(*)의 숫자가 동일하면
			// 판매 테이블에 판매일련번호가 같은 데이터를 찾아서 취소구분 업데이트 해야함. 
			else {
//				 2무료 3취소이기 때문에 뭘 안해도...?
			}
		}
		if(totalAmt != 0) {
			contents += "취소";
			cashVo.setAMT(Integer.toString(totalAmt));
			cashVo.setCONTENTS(contents);
			// 시재금 출금 insert 
			cashDao.salProdCancelValutCashOut(cashVo);
		}
		int countTransTy = salDao.countTransTy(salProdVo);
		int countSerNo = salDao.countSerNo(salProdVo);
		// 영수증 안에 모든 상품이 취소가 됐을 때
		if(countSerNo == countTransTy) {
			salDao.cancelRecipe(salProdVo);
		}
	}

	@Override
	public List srcBtnClickSales(Map<String, String> srcItems) {
		return salDao.srcBtnClickSales(srcItems);
	}

	@Override
	public List<SalesVo> srcBtnClickSalesProduct(Map<String, String> srcItems) {
		return salDao.srcBtnClickSalesProduct(srcItems);
	}

	// 취소 후 해당 행의 바뀐정보 업데이트
	@Override
	public Map<String, String> selectUpdateRecipe(JSONObject jsonObj, SalesPayVo salPayVo) {
		
		salPayVo.setSALES_SER_NO(jsonObj.getString("SALES_SER_NO"));
		return salDao.selectUpdateRecipe(salPayVo);
	}
}
