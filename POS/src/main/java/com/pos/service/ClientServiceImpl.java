package com.pos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.Vo.ClientVo;
import com.pos.dao.ClientDao;

@Service
public class ClientServiceImpl implements ClientService{
	
	@Autowired
	ClientDao cliDao;

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

	@Override
	public List srcClientByName(ClientVo cliVo) {
		return cliDao.srcClientByName(cliVo);
	}

	@Override
	public int isExistClientByBusiNo(ClientVo cliVo) {
		return cliDao.isExistClientByBusiNo(cliVo);
	}

	
}
