package com.pos.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pos.Vo.ProductClsVo;
import com.pos.Vo.ProductVo;

@Repository
public class ProductDaoImpl implements ProductDao {

	@Autowired
	SqlSession sqlsession;
	
	// 바코드 입력시 해당 상품정보 찾기
	@Override
	public Map<String, Object> srcProductByBarCode(ProductVo prodVo) {
		return sqlsession.selectOne("Product.srcProductByBarCode", prodVo);
	}


	@Override
	public void productInsert(ProductVo prodVo) {
		sqlsession.insert("Product.productInsert", prodVo);
	}


	@Override
	public String getProdCnt() {
		return sqlsession.selectOne("Product.getProdCnt");
	}

	@Override
	public List getProdClsName(ProductClsVo prodClsVo) {
		return sqlsession.selectList("Product.getProdClsName", prodClsVo);
	}
	
}
