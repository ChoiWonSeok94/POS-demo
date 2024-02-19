package com.pos.Vo;

public class SalesVo {
	private String SALES_DT;
	private String SALES_SER_NO;
	private String TER_NO;
	private String TRANS_DT;
	private String TRANS_TM;
	private String MEMB_TY;
	private String MEMB_SER_NO;
	private String CANC_TY;
	
	
	public String getSALES_DT() {
		return SALES_DT;
	}
	public void setSALES_DT(String sALES_DT) {
		SALES_DT = sALES_DT;
	}
	public String getSALES_SER_NO() {
		return SALES_SER_NO;
	}
	public void setSALES_SER_NO(String sALES_SER_NO) {
		SALES_SER_NO = sALES_SER_NO;
	}
	public String getTER_NO() {
		return TER_NO;
	}
	public void setTER_NO(String tER_NO) {
		TER_NO = tER_NO;
	}
	public String getTRANS_DT() {
		return TRANS_DT;
	}
	public void setTRANS_DT(String tRANS_DT) {
		TRANS_DT = tRANS_DT;
	}
	public String getTRANS_TM() {
		return TRANS_TM;
	}
	public void setTRANS_TM(String tRANS_TM) {
		TRANS_TM = tRANS_TM;
	}
	public String getMEMB_TY() {
		return MEMB_TY;
	}
	public void setMEMB_TY(String mEMB_TY) {
		MEMB_TY = mEMB_TY;
	}
	public String getMEMB_SER_NO() {
		return MEMB_SER_NO;
	}
	public void setMEMB_SER_NO(String mEMB_SER_NO) {
		MEMB_SER_NO = mEMB_SER_NO;
	}
	public String getCANC_TY() {
		return CANC_TY;
	}
	public void setCANC_TY(String cANC_TY) {
		CANC_TY = cANC_TY;
	}
	@Override
	public String toString() {
		return "SalesVo [SALES_DT=" + SALES_DT + ", SALES_SER_NO=" + SALES_SER_NO + ", TER_NO=" + TER_NO + ", TRANS_DT="
				+ TRANS_DT + ", TRANS_TM=" + TRANS_TM + ", MEMB_TY=" + MEMB_TY + ", MEMB_SER_NO=" + MEMB_SER_NO
				+ ", CANC_TY=" + CANC_TY + ", getSALES_DT()=" + getSALES_DT() + ", getSALES_SER_NO()="
				+ getSALES_SER_NO() + ", getTER_NO()=" + getTER_NO() + ", getTRANS_DT()=" + getTRANS_DT()
				+ ", getTRANS_TM()=" + getTRANS_TM() + ", getMEMB_TY()=" + getMEMB_TY() + ", getMEMB_SER_NO()="
				+ getMEMB_SER_NO() + ", getCANC_TY()=" + getCANC_TY() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
}
