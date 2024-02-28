package com.pos.dao;

import java.util.List;
import java.util.Map;

import com.cleopatra.json.JSONObject;
import com.pos.Vo.ProductClsVo;
import com.pos.Vo.ProductVo;

public interface ProductDao {
	
	Map<String, Object> srcProductByBarCode(ProductVo prodVo);
	void productInsert(ProductVo prodVo);
	String getProdCnt();
	List getProdClsName(ProductClsVo prodClsVo);
	int isExistProductByBarCode(ProductVo prodVo);
	List searchProductByOptions(Map<String, String> prodList);
}
