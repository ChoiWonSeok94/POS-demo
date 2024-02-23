package com.pos.dao;

import java.util.List;

import com.pos.Vo.ClientVo;

public interface ClientDao {
	void clientInsert(ClientVo cliVo);
	String getClientNoByClientNm(String clientNm);
	String getClientCnt();
	List srcClientByName(ClientVo cliVo);
	int isExistClientByBusiNo(ClientVo cliVo);
}
