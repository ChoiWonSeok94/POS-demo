package com.pos.Vo;

public class PosVo {
	private String TER_SER_NO;
	private String TER_NM;
	private String STORE_CD;
	private String VAN_NO;
	
	
	
	public String getTER_SER_NO() {
		return TER_SER_NO;
	}
	public void setTER_SER_NO(String tER_SER_NO) {
		TER_SER_NO = tER_SER_NO;
	}
	public String getTER_NM() {
		return TER_NM;
	}
	public void setTER_NM(String tER_NM) {
		TER_NM = tER_NM;
	}
	public String getSTORE_CD() {
		return STORE_CD;
	}
	public void setSTORE_CD(String sTORE_CD) {
		STORE_CD = sTORE_CD;
	}
	public String getVAN_NO() {
		return VAN_NO;
	}
	public void setVAN_NO(String vAN_NO) {
		VAN_NO = vAN_NO;
	}
	
	@Override
	public String toString() {
		return "PosVo [TER_SER_NO=" + TER_SER_NO + ", TER_NM=" + TER_NM + ", STORE_CD=" + STORE_CD + ", VAN_NO="
				+ VAN_NO + ", getTER_SER_NO()=" + getTER_SER_NO() + ", getTER_NM()=" + getTER_NM() + ", getSTORE_CD()="
				+ getSTORE_CD() + ", getVAN_NO()=" + getVAN_NO() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
}
