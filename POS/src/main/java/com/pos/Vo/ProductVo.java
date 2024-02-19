package com.pos.Vo;

public class ProductVo {

	private String PROD_CD;
	private String PROD_CLS_CD;
	private String PROD_NM;
	private String PROD_ENG_NM;
	private String ORIG_NAT;
	private String PURC_PR;
	private String SELL_PR;
	private String BAR_CODE;
	private String CLIENT_NO;
	private String COLOR;
	private String PROD_SIZE;
	private String SALE_OR_NOT;
	private String SALE_PR;
	private String TAXAT_TY;
	private String MEM_POINT;
	
	public String getPROD_CD() {
		return PROD_CD;
	}
	public void setPROD_CD(String pROD_CD) {
		PROD_CD = pROD_CD;
	}
	public String getPROD_CLS_CD() {
		return PROD_CLS_CD;
	}
	public void setPROD_CLS_CD(String pROD_CLS_CD) {
		PROD_CLS_CD = pROD_CLS_CD;
	}
	public String getPROD_NM() {
		return PROD_NM;
	}
	public void setPROD_NM(String pROD_NM) {
		PROD_NM = pROD_NM;
	}
	public String getPROD_ENG_NM() {
		return PROD_ENG_NM;
	}
	public void setPROD_ENG_NM(String pROD_ENG_NM) {
		PROD_ENG_NM = pROD_ENG_NM;
	}
	public String getORIG_NAT() {
		return ORIG_NAT;
	}
	public void setORIG_NAT(String oRIG_NAT) {
		ORIG_NAT = oRIG_NAT;
	}
	public String getPURC_PR() {
		return PURC_PR;
	}
	public void setPURC_PR(String pURC_PR) {
		PURC_PR = pURC_PR;
	}
	public String getSELL_PR() {
		return SELL_PR;
	}
	public void setSELL_PR(String sELL_PR) {
		SELL_PR = sELL_PR;
	}
	public String getBAR_CODE() {
		return BAR_CODE;
	}
	public void setBAR_CODE(String bAR_CODE) {
		BAR_CODE = bAR_CODE;
	}
	public String getCLIENT_NO() {
		return CLIENT_NO;
	}
	public void setCLIENT_NO(String cLIENT_NO) {
		CLIENT_NO = cLIENT_NO;
	}
	public String getCOLOR() {
		return COLOR;
	}
	public void setCOLOR(String cOLOR) {
		COLOR = cOLOR;
	}
	
	public String getPROD_SIZE() {
		return PROD_SIZE;
	}
	public void setPROD_SIZE(String pROD_SIZE) {
		PROD_SIZE = pROD_SIZE;
	}
	public String getSALE_OR_NOT() {
		return SALE_OR_NOT;
	}
	public void setSALE_OR_NOT(String sALE_OR_NOT) {
		SALE_OR_NOT = sALE_OR_NOT;
	}
	public String getSALE_PR() {
		return SALE_PR;
	}
	public void setSALE_PR(String sALE_PR) {
		SALE_PR = sALE_PR;
	}
	public String getTAXAT_TY() {
		return TAXAT_TY;
	}
	public void setTAXAT_TY(String tAXAT_TY) {
		TAXAT_TY = tAXAT_TY;
	}
	public String getMEM_POINT() {
		return MEM_POINT;
	}
	public void setMEM_POINT(String mEM_POINT) {
		MEM_POINT = mEM_POINT;
	}
	
	@Override
	public String toString() {
		return "ProductVo [PROD_CD=" + PROD_CD + ", PROD_CLS_CD=" + PROD_CLS_CD + ", PROD_NM=" + PROD_NM
				+ ", PROD_ENG_NM=" + PROD_ENG_NM + ", ORIG_NAT=" + ORIG_NAT + ", PURC_PR=" + PURC_PR + ", SELL_PR="
				+ SELL_PR + ", BAR_CODE=" + BAR_CODE + ", CLIENT_NO=" + CLIENT_NO + ", COLOR=" + COLOR + ", PROD_SIZE="
				+ PROD_SIZE + ", SALE_OR_NOT=" + SALE_OR_NOT + ", SALE_PR=" + SALE_PR + ", TAXAT_TY=" + TAXAT_TY
				+ ", MEM_POINT=" + MEM_POINT + ", getPROD_CD()=" + getPROD_CD() + ", getPROD_CLS_CD()="
				+ getPROD_CLS_CD() + ", getPROD_NM()=" + getPROD_NM() + ", getPROD_ENG_NM()=" + getPROD_ENG_NM()
				+ ", getORIG_NAT()=" + getORIG_NAT() + ", getPURC_PR()=" + getPURC_PR() + ", getSELL_PR()="
				+ getSELL_PR() + ", getBAR_CODE()=" + getBAR_CODE() + ", getCLIENT_NO()=" + getCLIENT_NO()
				+ ", getCOLOR()=" + getCOLOR() + ", getPROD_SIZE()=" + getPROD_SIZE() + ", getSALE_OR_NOT()="
				+ getSALE_OR_NOT() + ", getSALE_PR()=" + getSALE_PR() + ", getTAXAT_TY()=" + getTAXAT_TY()
				+ ", getMEM_POINT()=" + getMEM_POINT() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	
}
