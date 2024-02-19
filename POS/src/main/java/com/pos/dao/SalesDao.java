package com.pos.dao;

import java.util.List;
import java.util.Map;

import com.cleopatra.json.JSONObject;
import com.pos.Vo.SalesPayVo;
import com.pos.Vo.SalesProdVo;
import com.pos.Vo.SalesVo;

public interface SalesDao {

	int calculateSalInsert(SalesVo salVo);
	void calculateSalProdInsert(SalesProdVo salProVo);
	void calculateSalPayInsert(SalesPayVo salPayVo);
	String countPayTbl();
	List<SalesProdVo> productDetailSalesAmt(SalesProdVo salProdVo);
	int productCancel(SalesProdVo salProdVo);
	List<SalesVo> srcBtnClickSales(Map<String, String> srcItems);
	List<SalesVo> srcBtnClickSalesProduct(Map<String, String> srcItems);
	int countTransTy(SalesProdVo salProdvo);
	int countSerNo(SalesProdVo salProdVo);
	void cancelRecipe(SalesProdVo salProdVo);
	void updateSalesTblSalesAmt(SalesProdVo salProdVo);
	Map<String, String> selectUpdateRecipe(SalesPayVo salPayVo);
}
