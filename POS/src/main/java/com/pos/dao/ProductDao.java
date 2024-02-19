package com.pos.dao;

import java.util.Map;

import com.pos.Vo.ProductVo;

public interface ProductDao {
	
	Map<String, Object> srcProductByBarCode(ProductVo prodVo);
	void productInsert(ProductVo prodVo);
	String getProdCnt();
}
