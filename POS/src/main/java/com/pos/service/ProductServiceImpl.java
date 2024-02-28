package com.pos.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleopatra.json.JSONObject;
import com.pos.Vo.ProductClsVo;
import com.pos.Vo.ProductVo;
import com.pos.dao.ProductDao;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	ProductDao prodDao;
	
	@Override
	public Map<String, Object> srcProductByBarCode(ProductVo prodVo) {
		return prodDao.srcProductByBarCode(prodVo);
	}

	@Override
	public void productInsert(ProductVo prodVo) {
		prodDao.productInsert(prodVo);
	}

	@Override
	public String getProdCnt() {
		return prodDao.getProdCnt();
	}
	
	@Override
	public List getProdClsName(ProductClsVo prodClsVo) {
		return prodDao.getProdClsName(prodClsVo);
	}

	@Override
	public int isExistProductByBarCode(ProductVo prodVo) {
		return prodDao.isExistProductByBarCode(prodVo);
	}

	@Override
	public List searchProductByOptions(JSONObject jsonObj) {
		
		Map<String, String> prodList = new HashMap<>();
		
		prodList.put("PROD_CLS_CD", jsonObj.getString("PROD_CLS_CD"));
		prodList.put("BAR_CODE", jsonObj.getString("BAR_CODE"));
		prodList.put("PROD_NM", jsonObj.getString("PROD_NM"));
		prodList.put("CLIENT_NM", jsonObj.getString("CLIENT_NM"));
		
		return prodDao.searchProductByOptions(prodList);
	}
}
