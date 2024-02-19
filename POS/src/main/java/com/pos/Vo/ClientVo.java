package com.pos.Vo;

public class ClientVo {
	
	private String CLIENT_NO;
	private String CLIENT_NM;
	private String BUSI_NO;
	private String PERS_COP_TY;
	private String ID_NO;
	private String REPRES_NM;
	private String PH_NO;
	private String POST_NO;
	private String ADDR;
	
	public String getCLIENT_NO() {
		return CLIENT_NO;
	}
	public void setCLIENT_NO(String cLIENT_NO) {
		CLIENT_NO = cLIENT_NO;
	}
	public String getCLIENT_NM() {
		return CLIENT_NM;
	}
	public void setCLIENT_NM(String cLIENT_NM) {
		CLIENT_NM = cLIENT_NM;
	}
	public String getBUSI_NO() {
		return BUSI_NO;
	}
	public void setBUSI_NO(String bUSI_NO) {
		BUSI_NO = bUSI_NO;
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
	public String getREPRES_NM() {
		return REPRES_NM;
	}
	public void setREPRES_NM(String rEPRES_NM) {
		REPRES_NM = rEPRES_NM;
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
	public String getADDR() {
		return ADDR;
	}
	public void setADDR(String aDDR) {
		ADDR = aDDR;
	}
	
	@Override
	public String toString() {
		return "ClientVo [CLIENT_NO=" + CLIENT_NO + ", CLIENT_NM=" + CLIENT_NM + ", BUSI_NO=" + BUSI_NO
				+ ", PERS_COP_TY=" + PERS_COP_TY + ", ID_NO=" + ID_NO + ", REPRES_NM=" + REPRES_NM + ", PH_NO=" + PH_NO
				+ ", POST_NO=" + POST_NO + ", ADDR=" + ADDR + ", getCLIENT_NO()=" + getCLIENT_NO() + ", getCLIENT_NM()="
				+ getCLIENT_NM() + ", getBUSI_NO()=" + getBUSI_NO() + ", getPERS_COP_TY()=" + getPERS_COP_TY()
				+ ", getID_NO()=" + getID_NO() + ", getREPRES_NM()=" + getREPRES_NM() + ", getPH_NO()=" + getPH_NO()
				+ ", getPOST_NO()=" + getPOST_NO() + ", getADDR()=" + getADDR() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	
}
