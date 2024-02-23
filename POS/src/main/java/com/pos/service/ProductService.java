package com.pos.service;

import java.util.List;
import java.util.Map;

import com.pos.Vo.ProductClsVo;
import com.pos.Vo.ProductVo;

public interface ProductService {

	Map<String, Object> srcProductByBarCode(ProductVo prodVo);
	void productInsert(ProductVo prodVo);
	String getProdCnt();
	List getProdClsName(ProductClsVo prodClsVo);
	int isExistProductByBarCode(ProductVo prodVo);
}
