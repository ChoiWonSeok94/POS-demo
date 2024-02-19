package com.pos.service;

import java.util.Map;

import com.pos.Vo.ProductVo;

public interface ProductService {

	Map<String, Object> srcProductByBarCode(ProductVo prodVo);
	void productInsert(ProductVo prodVo);
	String getProdCnt();
}
