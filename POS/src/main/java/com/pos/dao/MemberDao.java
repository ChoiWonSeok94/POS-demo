package com.pos.dao;

import java.util.List;
import java.util.Map;

import com.pos.Vo.MemberVo;

public interface MemberDao {
	List<MemberVo> srcMemInfo(MemberVo memVo);
	int addMember(MemberVo memVo);
	List<MemberVo> getMember(MemberVo memVo);
	int totalMemCnt();
}
