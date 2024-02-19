package com.pos.Vo;

public class MemberVo {
	
	private String MEMB_SER_NO;
	private String PERS_COP_TY;
	private String ID_NO;
	private String BUSI_NO;
	private String MEMB_NM;
	private String MEMB_ENG_NM;
	private String BIR_DAY;
	private String MOB_PH_NO;
	private String PH_NO;
	private String POST_NO;
	private String ADDR_1;
	private String ADDR_2;
	private String EMAIL;
	private String SECE_DT;
	
	public String getMEMB_SER_NO() {
		return MEMB_SER_NO;
	}
	public void setMEMB_SER_NO(String mEMB_SER_NO) {
		MEMB_SER_NO = mEMB_SER_NO;
	}
	public String getPERS_COP_TY() {
		return PERS_COP_TY;
	}
	public void setPERS_COP_TY(String pERS_COP_TY) {
		PERS_COP_TY = pERS_COP_TY;
	}
	public String getID_NO() {
		return ID_NO;
	}
	public void setID_NO(String iD_NO) {
		ID_NO = iD_NO;
	}
	public String getBUSI_NO() {
		return BUSI_NO;
	}
	public void setBUSI_NO(String bUSI_NO) {
		BUSI_NO = bUSI_NO;
	}
	public String getMEMB_NM() {
		return MEMB_NM;
	}
	public void setMEMB_NM(String mEMB_NM) {
		MEMB_NM = mEMB_NM;
	}
	public String getMEMB_ENG_NM() {
		return MEMB_ENG_NM;
	}
	public void setMEMB_ENG_NM(String mEMB_ENG_NM) {
		MEMB_ENG_NM = mEMB_ENG_NM;
	}
	public String getBIR_DAY() {
		return BIR_DAY;
	}
	public void setBIR_DAY(String bIR_DAY) {
		BIR_DAY = bIR_DAY;
	}
	public String getMOB_PH_NO() {
		return MOB_PH_NO;
	}
	public void setMOB_PH_NO(String mOB_PH_NO) {
		MOB_PH_NO = mOB_PH_NO;
	}
	public String getPH_NO() {
		return PH_NO;
	}
	public void setPH_NO(String pH_NO) {
		PH_NO = pH_NO;
	}
	public String getPOST_NO() {
		return POST_NO;
	}
	public void setPOST_NO(String pOST_NO) {
		POST_NO = pOST_NO;
	}
	public String getADDR_1() {
		return ADDR_1;
	}
	public void setADDR_1(String aDDR_1) {
		ADDR_1 = aDDR_1;
	}
	public String getADDR_2() {
		return ADDR_2;
	}
	public void setADDR_2(String aDDR_2) {
		ADDR_2 = aDDR_2;
	}
	
	public String getEMAIL() {
		return EMAIL;
	}
	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}
	public String getSECE_DT() {
		return SECE_DT;
	}
	public void setSECE_DT(String sECE_DT) {
		SECE_DT = sECE_DT;
	}
	
	@Override
	public String toString() {
		return "MemberVo [MEMB_SER_NO=" + MEMB_SER_NO + ", PERS_COP_TY=" + PERS_COP_TY + ", ID_NO=" + ID_NO
				+ ", BUSI_NO=" + BUSI_NO + ", MEMB_NM=" + MEMB_NM + ", MEMB_ENG_NM=" + MEMB_ENG_NM + ", BIR_DAY="
				+ BIR_DAY + ", MOB_PH_NO=" + MOB_PH_NO + ", PH_NO=" + PH_NO + ", POST_NO=" + POST_NO + ", ADDR_1="
				+ ADDR_1 + ", ADDR_2=" + ADDR_2 + ", EMAIL=" + EMAIL + ", SECE_DT=" + SECE_DT + ", getMEMB_SER_NO()="
				+ getMEMB_SER_NO() + ", getPERS_COP_TY()=" + getPERS_COP_TY() + ", getID_NO()=" + getID_NO()
				+ ", getBUSI_NO()=" + getBUSI_NO() + ", getMEMB_NM()=" + getMEMB_NM() + ", getMEMB_ENG_NM()="
				+ getMEMB_ENG_NM() + ", getBIR_DAY()=" + getBIR_DAY() + ", getMOB_PH_NO()=" + getMOB_PH_NO()
				+ ", getPH_NO()=" + getPH_NO() + ", getPOST_NO()=" + getPOST_NO() + ", getADDR_1()=" + getADDR_1()
				+ ", getADDR_2()=" + getADDR_2() + ", getEMAIL()=" + getEMAIL() + ", getSECE_DT()=" + getSECE_DT()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
	
}
