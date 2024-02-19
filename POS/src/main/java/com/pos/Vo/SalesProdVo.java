package com.pos.Vo;

public class SalesProdVo {
	
	private String SALES_DT;
	private String SALES_SER_NO;
	private String SER_NO;
	private String PROD_CD;
	private String QTY;
	private String SALES_PR;
	private String VAT;
	private String SALE_AMT;
	private String SALES_AMT;
	private String TAX_TY;
	private String TRANS_TY;
	
	
	
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
	public String getPROD_CD() {
		return PROD_CD;
	}
	public void setPROD_CD(String pROD_CD) {
		PROD_CD = pROD_CD;
	}
	public String getQTY() {
		return QTY;
	}
	public void setQTY(String qTY) {
		QTY = qTY;
	}
	public String getSALES_PR() {
		return SALES_PR;
	}
	public void setSALES_PR(String sALES_PR) {
		SALES_PR = sALES_PR;
	}
	public String getVAT() {
		return VAT;
	}
	public void setVAT(String vAT) {
		VAT = vAT;
	}
	public String getSALE_AMT() {
		return SALE_AMT;
	}
	public void setSALE_AMT(String sALE_AMT) {
		SALE_AMT = sALE_AMT;
	}
	public String getSALES_AMT() {
		return SALES_AMT;
	}
	public void setSALES_AMT(String sALES_AMT) {
		SALES_AMT = sALES_AMT;
	}
	public String getTAX_TY() {
		return TAX_TY;
	}
	public void setTAX_TY(String tAX_TY) {
		TAX_TY = tAX_TY;
	}
	public String getTRANS_TY() {
		return TRANS_TY;
	}
	public void setTRANS_TY(String tRANS_TY) {
		TRANS_TY = tRANS_TY;
	}
	
	@Override
	public String toString() {
		return "SalesProdVo [SALES_DT=" + SALES_DT + ", SALES_SER_NO=" + SALES_SER_NO + ", SER_NO=" + SER_NO
				+ ", PROD_CD=" + PROD_CD + ", QTY=" + QTY + ", SALES_PR=" + SALES_PR + ", VAT=" + VAT + ", SALE_AMT="
				+ SALE_AMT + ", SALES_AMT=" + SALES_AMT + ", TAX_TY=" + TAX_TY + ", TRANS_TY=" + TRANS_TY
				+ ", getSALES_DT()=" + getSALES_DT() + ", getSALES_SER_NO()=" + getSALES_SER_NO() + ", getSER_NO()="
				+ getSER_NO() + ", getPROD_CD()=" + getPROD_CD() + ", getQTY()=" + getQTY() + ", getSALES_PR()="
				+ getSALES_PR() + ", getVAT()=" + getVAT() + ", getSALE_AMT()=" + getSALE_AMT() + ", getSALES_AMT()="
				+ getSALES_AMT() + ", getTAX_TY()=" + getTAX_TY() + ", getTRANS_TY()=" + getTRANS_TY() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	
}
