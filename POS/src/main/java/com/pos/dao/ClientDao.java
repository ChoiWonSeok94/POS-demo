package com.pos.dao;

import java.util.List;

import com.pos.Vo.ClientVo;

public interface ClientDao {
	List<ClientVo> searchClient(ClientVo cliVo);
	void clientInsert(ClientVo cliVo);
	String getClientNoByClientNm(String clientNm);
	String getClientCnt();
}
