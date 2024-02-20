package com.pos.service;

import java.util.List;

import com.pos.Vo.ClientVo;

public interface ClientService {
	List<ClientVo>searchClient(ClientVo cliVo);
	void clientInsert(ClientVo cliVo);
	String getClientNoByClientNm(String clientNm);
	String getClientCnt();
	List srcClientByName(ClientVo cliVo);
}
