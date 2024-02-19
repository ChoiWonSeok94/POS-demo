package com.pos.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.XBConfig;
import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.UploadFile;
import com.cleopatra.spring.JSONDataView;

@Controller
@RequestMapping("/File")
public class FileUploadDownloadController {
	
	public FileUploadDownloadController() {
	}
	
	
	@RequestMapping("/list.do")
	public View list(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		
		List<Map<String, Object>> fileList = this.fileList();
		
		dataRequest.setResponse("dsFileList", fileList);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/upload.do")
	public View upload(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws IOException {

		// exbuilder/config/exbuilder.json --> tempdirpath 경로
		File root = new File(XBConfig.getInstance().getFileUploadConfig().getTempDir());
		
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		if(uploadFiles != null && uploadFiles.size() > 0) {
			Set<Entry<String, UploadFile[]>> entries = uploadFiles.entrySet();
			for(Entry<String, UploadFile[]> entry : entries) {
				UploadFile[] uFiles = entry.getValue();
				for(UploadFile uFile : uFiles){
					File file = uFile.getFile();
					// tempdirpath 경로에 폴더가 없을 경우 폴더를 생성한다.
					if(!root.exists()){
						root.mkdir();
					}
					String strFileName = uFile.getFileName();				//파일명
//					String strFileSize = Long.toString(file.length());		//파일 사이즈
//					if(strFileName.endsWith(".tmp")){
//						strFileName = strFileName.indexOf(".") != -1 ? strFileName.substring(0, strFileName.length()-4) : strFileName;
//					}
//					int iFileExtIndex = strFileName.lastIndexOf(".");
//					String strFileExt = iFileExtIndex > -1 ? strFileName.substring(iFileExtIndex+1).toLowerCase() : ""; 	//확장자명
//					String strTempPath = file.getPath();	//임시 파일업로드 경로
					file.renameTo(new File(root , strFileName)); // 파일명 변경
				}
			}
		}
		
		this.list(request, response, dataRequest);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/download.do")
	public void download(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws IOException {
		
		ParameterGroup dmParamDown = dataRequest.getParameterGroup("dmParamDown");
		String fileName = getUrlEncodedFileName(request, dmParamDown.getValue("fileName"));
		
		String resCharset = request.getHeader("res-charset");
		if ((resCharset == null) || (resCharset.equalsIgnoreCase(""))) {
			resCharset = "UTF-8";
		}
		
		BufferedInputStream in = null;
		BufferedOutputStream out = null;
		try {
			response.setContentType("application/x-msdownload" + ";charset=" + resCharset);
			//웹취약점 보완
			//외부에서 입력한 파일명을 헤더에 추가하는 경우에 HTTP 응답분할 취약점이 발생할 수 있으므로, \r, \n 문자를 제거한다.
    		response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName.replaceAll("[\\r\\n]", "") + "\"" );
    		
			in = new BufferedInputStream(new FileInputStream(dmParamDown.getValue("filePath")));
			out = new BufferedOutputStream(response.getOutputStream());
			int data;
			while((data = in.read()) != -1){
				out.write(data);
			}
			out.flush();
		} catch (IOException e) {
			throw e;
		} catch (Exception e) {
			throw e;
		} finally {
			in.close();
			out.close();
		}
		
	}
	
	private List<Map<String, Object>> fileList() {
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		
		// tempdirpath 경로에 있는 파일을 읽어와서 다운로드 한다.
		File root = new File(XBConfig.getInstance().getFileUploadConfig().getTempDir());
		File[] files = root.listFiles();
		for(File file : files) {
			Map<String, Object> fileInfo = new HashMap<String, Object>();
			
			String fileName = file.getName();
			long fileSize = file.length();
			
			fileInfo.put("fileName", fileName);
			fileInfo.put("fileSize", fileSize);
			fileInfo.put("filePath", file.getPath());
			
			fileList.add(fileInfo);
		}		
		return fileList;
	}
	
	private String encodingDownloadFileName(HttpServletRequest request, String downloadFileName) throws UnsupportedEncodingException {
		String userAgent = request.getHeader("User-Agent");
		
		if(userAgent.contains("MSIE") || userAgent.contains("Chrome") || 
				userAgent.contains("Firefox") || 
				(userAgent.contains("Windows") && userAgent.contains("Trident"))){
			downloadFileName = URLEncoder.encode(downloadFileName, "utf-8");
			downloadFileName = downloadFileName.replaceAll("\\+","%20");
        }
			
		return downloadFileName;
	}
    
    /**
	 * 웹 어플리케이션 파일 다운로드를 위한 UrlEncoded된 파일명을 반환한다.
	 * @param request
	 * @param fileName
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String getUrlEncodedFileName(HttpServletRequest request, String fileName) throws UnsupportedEncodingException{
		String userAgent = request.getHeader("user-agent");
		String resCharset = request.getHeader("res-charset");
		if ((resCharset == null) || (resCharset.equalsIgnoreCase(""))) {
			resCharset = "UTF-8";
		}
		
		//IE 브라우저인 경우
    	if ((userAgent.indexOf("MSIE") > -1 
    			|| userAgent.indexOf("Edge") > -1 
    			|| userAgent.indexOf("Trident") > -1) 
    			|| (userAgent.indexOf("Java") > -1)){
    		fileName = URLEncoder.encode(fileName, resCharset);
    		fileName = fileName.replace("+", "%20");
    	
    	//크롬/firefox 브라이저인 경우
    	}else if(userAgent.indexOf("Chrome") > -1){
    		StringBuffer sb = new StringBuffer();
  			for(int i=0; i<fileName.length(); i++) {
  				char c = fileName.charAt(i);
  				if(c>'~') {
  					sb.append(URLEncoder.encode(""+c, "UTF-8"));
  				}else {
  					sb.append(c);
  				}
  			}
  			fileName = sb.toString();
  			
    	}else if(userAgent.indexOf("Firefox") > -1){
    		fileName = new String(fileName.getBytes(), "8859_1");
    	//기타 브라우저인 경우
    	} else {
    		fileName = new String(fileName.getBytes(), "8859_1");
		}
    	
    	return fileName.replaceAll("[\\r\\n]", "");
	}
}
