package com.pos.service;

import com.pos.Vo.CashVo;

public interface CashService {

//	void calculateCashInsert(CashVo cashVo);
	int vaultCashInOut(CashVo cashVo);
	int getAmtInit();
}
