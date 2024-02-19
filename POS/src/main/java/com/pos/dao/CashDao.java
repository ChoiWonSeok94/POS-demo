package com.pos.dao;

import com.pos.Vo.CashVo;

public interface CashDao {

//	void calculateCashInsert(CashVo cashVo);
	int vaultCashInOut(CashVo cashVo);
	int getAmtInit();
	void salProdCancelValutCashOut(CashVo cashVo);
}
