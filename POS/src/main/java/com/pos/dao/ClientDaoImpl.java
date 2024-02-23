package com.pos.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pos.Vo.ClientVo;
import com.pos.Vo.ProductClsVo;

@Repository
public class ClientDaoImpl implements ClientDao{
	
	@Autowired
	SqlSession sqlsession;


	@Override
	public void clientInsert(ClientVo cliVo) {
		sqlsession.insert("Client.clientInsert", cliVo);
	}

	@Override
	public String getClientNoByClientNm(String clientNm) {
		return sqlsession.selectOne("Client.getClientNoByClientNm", clientNm);
	}

	@Override
	public String getClientCnt() {
		return sqlsession.selectOne("Client.getClientCnt");
	}

	@Override
	public List srcClientByName(ClientVo cliVo) {
		return sqlsession.selectList("Client.srcClientByName", cliVo);
	}

	@Override
	public int isExistClientByBusiNo(ClientVo cliVo) {
		return sqlsession.selectOne("Client.isExistClientByBusiNo", cliVo);
	}
}
