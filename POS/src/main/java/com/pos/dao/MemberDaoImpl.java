package com.pos.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pos.Vo.MemberVo;

@Repository
public class MemberDaoImpl implements MemberDao{
	@Autowired
	SqlSession sqlsession;

	@Override
	public List<MemberVo> srcMemInfo(MemberVo memVo) {
		return sqlsession.selectList("Member.srcMemInfo", memVo);
	}
	
	// 약식 회원가입
	@Override
	public int addMember(MemberVo memVo) {
		return sqlsession.insert("Member.addMember", memVo);
	}

	@Override
	public List<MemberVo> getMember(MemberVo memVo) {
		return sqlsession.selectList("Member.getMember", memVo);
	}

	@Override
	public int totalMemCnt() {
		return sqlsession.selectOne("Member.totalMemCnt");
	}

	@Override
	public int memInfoExistCntByIdNo(MemberVo memVo) {
		return sqlsession.selectOne("Member.memInfoExistCntByIdNo", memVo);
	}

	@Override
	public List<MemberVo> doExistMemberSrcMemSerNoByIdNo(MemberVo memVo) {
		return sqlsession.selectList("Member.doExistMemberSrcMemSerNoByIdNo", memVo);
	}

	@Override
	public void calculateUpdatePoint(MemberVo memVo) {
		sqlsession.update("Member.calculateUpdatePoint", memVo);
	}
}
