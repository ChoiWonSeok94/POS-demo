package com.pos.Vo;

public class SalesPayVo {
	private String SALES_DT;
	private String SALES_SER_NO;
	private String SER_NO;
	private String SALES_TY;
	private String SALES_AMT;
	
	
	
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
	public String getSER_NO() {
		return SER_NO;
	}
	public void setSER_NO(String sER_NO) {
		SER_NO = sER_NO;
	}
	public String getSALES_TY() {
		return SALES_TY;
	}
	public void setSALES_TY(String sALES_TY) {
		SALES_TY = sALES_TY;
	}
	public String getSALES_AMT() {
		return SALES_AMT;
	}
	public void setSALES_AMT(String sALES_AMT) {
		SALES_AMT = sALES_AMT;
	}
	
	@Override
	public String toString() {
		return "SalesPayVo [SALES_DT=" + SALES_DT + ", SALES_SER_NO=" + SALES_SER_NO + ", SER_NO=" + SER_NO
				+ ", SALES_TY=" + SALES_TY + ", SALES_AMT=" + SALES_AMT + ", getSALES_DT()=" + getSALES_DT()
				+ ", getSALES_SER_NO()=" + getSALES_SER_NO() + ", getSER_NO()=" + getSER_NO() + ", getSALES_TY()="
				+ getSALES_TY() + ", getSALES_AMT()=" + getSALES_AMT() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
}
