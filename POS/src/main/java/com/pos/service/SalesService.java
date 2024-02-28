package com.pos.service;

import java.util.List;
import java.util.Map;

import com.cleopatra.json.JSONObject;
import com.pos.Vo.CashVo;
import com.pos.Vo.MemberVo;
import com.pos.Vo.SalesPayVo;
import com.pos.Vo.SalesProdVo;
import com.pos.Vo.SalesVo;

public interface SalesService {
	void calculateSalInsert(JSONObject jsonObj, SalesVo salVo, SalesPayVo salPayVo, SalesProdVo salProVo, CashVo cashVo, MemberVo memVo);
	List<SalesProdVo> productDetailSalesAmt(SalesProdVo salProdVo);
	void productCancel(JSONObject jsonObj, SalesProdVo salProdVo, CashVo cashVo);
	List srcBtnClickSales(Map<String, String> srcItems);
	List<SalesVo> srcBtnClickSalesProduct(Map<String, String> srcItems);
	Map<String, String> selectUpdateRecipe(JSONObject jsonObj, SalesPayVo salPayVo);
}
