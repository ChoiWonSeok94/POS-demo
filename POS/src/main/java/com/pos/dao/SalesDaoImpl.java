package com.pos.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pos.Vo.SalesPayVo;
import com.pos.Vo.SalesProdVo;
import com.pos.Vo.SalesVo;

@Repository
public class SalesDaoImpl implements SalesDao{
	@Autowired
	SqlSession sqlsession;
	
	@Override
	public int calculateSalInsert(SalesVo salVo) {
			return sqlsession.insert("Sales.salesCalInsert", salVo);
	}
	@Override
	public void calculateSalProdInsert(SalesProdVo salProVo) {
		sqlsession.insert("Sales.salesProdCalInsert", salProVo);
	}

	@Override
	public void calculateSalPayInsert(SalesPayVo salPayVo) {
		sqlsession.insert("Sales.salesPayCalInsert", salPayVo);
	}
	
	@Override
	public List<SalesProdVo> productDetailSalesAmt(SalesProdVo salProdVo) {
		return sqlsession.selectList("Sales.productDetailSalesAmt", salProdVo);
	}

	@Override
	public int productCancel(SalesProdVo salProdVo) {
		return sqlsession.update("Sales.cancelPart", salProdVo);
	}

	@Override
	public List<SalesVo> srcBtnClickSales(Map<String, String> srcItems) {
		return sqlsession.selectList("Sales.srcBtnSales", srcItems);
	}
	@Override
	public String countPayTbl() {
		return sqlsession.selectOne("Sales.countPayTbl");
	}
	@Override
	public List<SalesVo> srcBtnClickSalesProduct(Map<String, String> srcItems) {
		return sqlsession.selectList("Sales.srcBtnSalesProduct", srcItems);
	}
	@Override
	public int countTransTy(SalesProdVo salProdVo) {
		return sqlsession.selectOne("Sales.countTransTy", salProdVo);
	}
	@Override
	public int countSerNo(SalesProdVo salProdVo) {
		return sqlsession.selectOne("Sales.countSerNo", salProdVo);
	}
	@Override
	public void cancelRecipe(SalesProdVo salProdVo) {
		sqlsession.update("Sales.cancelRecipe", salProdVo);
	}
	@Override
	public void updateSalesTblSalesAmt(SalesProdVo salProdVo) {
		sqlsession.update("Sales.updateSalesTblSalesAmt", salProdVo);
	}
	@Override
	public Map<String, String> selectUpdateRecipe(SalesPayVo salPayVo) {
		return sqlsession.selectOne("Sales.selectUpdateRecipe", salPayVo);
	}
	
}
