package com.pos.dao;

import java.util.List;

import com.pos.Vo.MemberVo;

public interface MemberDao {
	List<MemberVo> srcMemInfo(MemberVo memVo);
	int addMember(MemberVo memVo);
	List<MemberVo> getMember(MemberVo memVo);
	int totalMemCnt();
	int memInfoExistCntByIdNo(MemberVo memVo);
	List<MemberVo> doExistMemberSrcMemSerNoByIdNo(MemberVo memVo);
	void calculateUpdatePoint(MemberVo memVo);
}
