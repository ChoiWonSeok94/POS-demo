package com.pos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.Vo.MemberVo;
import com.pos.dao.MemberDao;
import com.pos.dao.ProductDao;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	ProductDao prodDao;
	
	@Autowired
	MemberDao memDao;
	

	@Override
	public List<MemberVo> srcMemInfo(MemberVo memVo){
		return memDao.srcMemInfo(memVo);
	}

	@Override
	public List<MemberVo> addMember(MemberVo memVo) {
		// 회원가입
		memDao.addMember(memVo);
		
//		memVo.setMEMB_SER_NO();
		return memDao.getMember(memVo);
	}

	@Override
	public int totalMemCnt() {
		return memDao.totalMemCnt();
	}

	@Override
	public int memInfoExistCntByIdNo(MemberVo memVo) {
		return memDao.memInfoExistCntByIdNo(memVo);
	}

	@Override
	public List<MemberVo> doExistMemberSrcMemSerNoByIdNo(MemberVo memVo) {
		return memDao.doExistMemberSrcMemSerNoByIdNo(memVo);
	}
	
	
}
