package com.pos.Vo;

public class CashVo {
	
	private String TER_SER_NO;
	private String DEP_PAY_DT;
	private String DEP_PAY_TM;
	private String DEP_PAY_TY;
	private String CONTENTS;
	private String AMT;
	
	public String getTER_SER_NO() {
		return TER_SER_NO;
	}
	public void setTER_SER_NO(String tER_SER_NO) {
		TER_SER_NO = tER_SER_NO;
	}
	public String getDEP_PAY_DT() {
		return DEP_PAY_DT;
	}
	public void setDEP_PAY_DT(String dEP_PAY_DT) {
		DEP_PAY_DT = dEP_PAY_DT;
	}
	public String getDEP_PAY_TM() {
		return DEP_PAY_TM;
	}
	public void setDEP_PAY_TM(String dEP_PAY_TM) {
		DEP_PAY_TM = dEP_PAY_TM;
	}
	public String getDEP_PAY_TY() {
		return DEP_PAY_TY;
	}
	public void setDEP_PAY_TY(String dEP_PAY_TY) {
		DEP_PAY_TY = dEP_PAY_TY;
	}
	public String getCONTENTS() {
		return CONTENTS;
	}
	public void setCONTENTS(String cONTENTS) {
		CONTENTS = cONTENTS;
	}
	public String getAMT() {
		return AMT;
	}
	public void setAMT(String aMT) {
		AMT = aMT;
	}
	
	@Override
	public String toString() {
		return "CashVo [TER_SER_NO=" + TER_SER_NO + ", DEP_PAY_DT=" + DEP_PAY_DT + ", DEP_PAY_TM=" + DEP_PAY_TM
				+ ", DEP_PAY_TY=" + DEP_PAY_TY + ", CONTENTS=" + CONTENTS + ", AMT=" + AMT + ", getTER_SER_NO()="
				+ getTER_SER_NO() + ", getDEP_PAY_DT()=" + getDEP_PAY_DT() + ", getDEP_PAY_TM()=" + getDEP_PAY_TM()
				+ ", getDEP_PAY_TY()=" + getDEP_PAY_TY() + ", getCONTENTS()=" + getCONTENTS() + ", getAMT()=" + getAMT()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
}
