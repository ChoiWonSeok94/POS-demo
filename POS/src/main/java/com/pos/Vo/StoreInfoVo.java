package com.pos.Vo;

public class StoreInfoVo {
	
	private String STORE_CD;
	private String STORE_NM;
	private String STORE_AREA_CD;
	
	public String getSTORE_CD() {
		return STORE_CD;
	}
	public void setSTORE_CD(String sTORE_CD) {
		STORE_CD = sTORE_CD;
	}
	public String getSTORE_NM() {
		return STORE_NM;
	}
	public void setSTORE_NM(String sTORE_NM) {
		STORE_NM = sTORE_NM;
	}
	public String getSTORE_AREA_CD() {
		return STORE_AREA_CD;
	}
	public void setSTORE_AREA_CD(String sTORE_AREA_CD) {
		STORE_AREA_CD = sTORE_AREA_CD;
	}
	
	@Override
	public String toString() {
		return "StoreInfoVo [STORE_CD=" + STORE_CD + ", STORE_NM=" + STORE_NM + ", STORE_AREA_CD=" + STORE_AREA_CD
				+ ", getSTORE_CD()=" + getSTORE_CD() + ", getSTORE_NM()=" + getSTORE_NM() + ", getSTORE_AREA_CD()="
				+ getSTORE_AREA_CD() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
}