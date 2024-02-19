package com.pos.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pos.Vo.CashVo;

@Repository
public class CashDaoImpl implements CashDao{
	
	@Autowired
	SqlSession sqlsession;

//	@Override
//	public void calculateCashInsert(CashVo cashVo) {
//		sqlsession.insert("Cash.calculateCashInsert", cashVo);
//	}

	@Override
	public int vaultCashInOut(CashVo cashVo) {
		return sqlsession.insert("Cash.vaultCashInOut", cashVo);
	}

	@Override
	public int getAmtInit() {
		int amt = sqlsession.selectOne("Cash.getAmtInit");;
		return amt;
	}

	@Override
	public void salProdCancelValutCashOut(CashVo cashVo) {
		sqlsession.insert("Cash.salProdCancelValutCashOut", cashVo);
	}
	
	
}
