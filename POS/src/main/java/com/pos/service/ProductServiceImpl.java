package com.pos.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
