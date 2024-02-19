package com.pos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleopatra.protocol.data.DataRequest;
import com.pos.Vo.ClientVo;
import com.pos.dao.ClientDao;

@Service
public class ClientServiceImpl implements ClientService{
	
	@Autowired
	ClientDao cliDao;

	@Override
	public List<ClientVo> searchClient(ClientVo cliVo) {
		
		return cliDao.searchClient(cliVo);
	}

	@Override
	public void clientInsert(ClientVo cliVo) {
		cliDao.clientInsert(cliVo);
	}

	@Override
	public String getClientNoByClientNm(String clientNm) {
		return cliDao.getClientNoByClientNm(clientNm);
	}

	@Override
	public String getClientCnt() {
		return cliDao.getClientCnt();
	}
	
}