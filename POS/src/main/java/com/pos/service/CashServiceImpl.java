package com.pos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.Vo.CashVo;
import com.pos.dao.CashDao;

@Service
public class CashServiceImpl implements CashService{
	
	@Autowired
	CashDao cashDao;
	
//	@Override
//	public void calculateCashInsert(CashVo cashVo) {
//		cashDao.calculateCashInsert(cashVo);
//	}
	
	@Override
	public int vaultCashInOut(CashVo cashVo) {
		return cashDao.vaultCashInOut(cashVo);
	}

	@Override
	public int getAmtInit() {
		return cashDao.getAmtInit();
	}
}
