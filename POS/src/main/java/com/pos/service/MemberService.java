package com.pos.service;

import java.util.List;

import com.pos.Vo.MemberVo;

public interface MemberService {

	List<MemberVo> srcMemInfo(MemberVo memVo);
	List<MemberVo> addMember(MemberVo memVo);
	int totalMemCnt();
	int memInfoExistCntByIdNo(MemberVo memVo);
	List<MemberVo> doExistMemberSrcMemSerNoByIdNo(MemberVo memVo);
}
