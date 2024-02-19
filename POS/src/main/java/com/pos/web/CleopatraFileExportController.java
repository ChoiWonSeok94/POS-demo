package com.pos.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.annotation.PostConstruct;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cleopatra.export.CSVExporter;
import com.cleopatra.export.ExcelExporter;
import com.cleopatra.export.Exporter;
import com.cleopatra.export.ExporterFactory;
import com.cleopatra.export.ExporterFactory.EXPORTTYPE;
import com.cleopatra.export.PDFExporter;
import com.cleopatra.export.source.DataSource;
import com.cleopatra.export.source.JSONDataSourceBuilder;
import com.cleopatra.export.target.HttpResponseOutputTarget;
import com.cleopatra.export.target.OutputTarget;
import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;


@Controller
public class CleopatraFileExportController {
	
	
	@PostConstruct
	private void init() {
//		// PDF Export를 사용할 경우 PDF에서 사용할 폰트파일을 등록(공개된 폰트만 사용)
//		PDFExporter.setDefaultTruTypeFont(new java.io.File("E:\\workspace\\workspace2\\exb6Frame\\src\\main\\java\\com\\tomatosystem\\exbuilder\\web\\malgun.ttf"));
		// 제목글의 폰트 사이즈(단위는 point)
		PDFExporter.setDefaultTitleFontSize(8);
		// 목록글의  폰트 사이즈(단위는 point)
		PDFExporter.setDefaultTableFontSize(6);
	}
	
	
	@RequestMapping("/export/{fileName}.csv")
	public void exportCSV(HttpServletRequest request, HttpServletResponse response, @PathVariable("fileName") String fileName) throws IOException {
		String downloadFileName = fileName + ".csv";
		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);
		
		response.setContentType("text/csv;charset=utf-8");
		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");
		
		this.export(request, response, fileName, EXPORTTYPE.CSV);
	}
	
	@RequestMapping("/export/{fileName}.pdf")
	public void exportPDF(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String downloadFileName = "test"+ ".pdf";
		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);
		
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/pdf");
		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");
		
		this.export(request, response, downloadFileName, EXPORTTYPE.PDF);
		
	}
	
	@RequestMapping("/export/test.do")
	public void testexportXLSX(HttpServletRequest request, HttpServletResponse response, DataRequest dateqreq) throws IOException {
		
		// 단건정보들을 담은 데이터 
		// 추가적으로 가공해야하는 단건에 대한 정보를 클라이언트 혹은 서버에서 직업 가져와도 상관없습니다.
		ParameterGroup dmParam = dateqreq.getParameterGroup("dm1");
		
		//기본으로 제공되어있던 스크립트
//		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);		
//		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");		
//		this.export(request, response, fileName, EXPORTTYPE.SXLSX);
		
		//아래형태로 workbook 데이터를 가져올 수 있습니다.
		DataSource dataSource = JSONDataSourceBuilder.build(request, "fileName.xlsx");
		ExporterFactory factory = ExporterFactory.getInstance();
		ExcelExporter exporter = (ExcelExporter)factory.getExporter(EXPORTTYPE.XLSX);
		
		Workbook workbook = exporter.export(dataSource);
		
		Sheet sheet = workbook.getSheetAt(0);
		
		//해당 sheet에서는 기본적으로 설정되어있는 그리드의 데이터만 들어가있습니다. 
		//해당 sheet에서 데이터를 원하는 형태의 레포트 형태로 가이드해주시면 됩니다.
		
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment;filename=\"fileName.xlsx\"");
		response.setHeader("Content-Transfer-Encoding", "binary");
		
		ServletOutputStream out = response.getOutputStream();
		workbook.write(out);
		out.flush();
		workbook.close();
		
		
	}
	
	
	
	@RequestMapping("/export/{fileName}.xls")
	public void exportXLS(HttpServletRequest request, HttpServletResponse response, @PathVariable("fileName") String fileName) throws IOException {
		String downloadFileName = fileName + ".xls";
		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);
				
		response.setContentType("application/vnd.ms-excel");
		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");
		
		this.export(request, response, fileName, EXPORTTYPE.XLS);
	}
	
	@RequestMapping("/export/{fileName}.xlsx")
	public void exportXLSX(HttpServletRequest request, HttpServletResponse response, @PathVariable("fileName") String fileName) throws IOException {
		String downloadFileName = fileName + ".xlsx";
		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);
		
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");
		
		this.export(request, response, fileName, EXPORTTYPE.SXLSX);
	}
	
	private void export(HttpServletRequest request, HttpServletResponse response, String fileName, EXPORTTYPE type) throws IOException {
		response.setCharacterEncoding("utf-8");
		String newFileName = URLDecoder.decode(fileName, "utf-8");
		DataSource dataSource = JSONDataSourceBuilder.build(request, newFileName);
		OutputTarget outputTarget = new HttpResponseOutputTarget(response);
		
		ExporterFactory exporterFactory = ExporterFactory.getInstance();
		Exporter exporter = exporterFactory.getExporter(type);
		
		if(type == EXPORTTYPE.CSV){
			((CSVExporter)exporter).setAutoWrap(false);
		}
		
		exporter.export(dataSource, outputTarget);
		
		response.flushBuffer();
	}
	
	private String encodingDownloadFileName(HttpServletRequest request, String psDownloadFileName) throws UnsupportedEncodingException {
		
		String downloadFileName = psDownloadFileName;
		String userAgent = request.getHeader("User-Agent");
		
		if(userAgent.contains("MSIE") || userAgent.contains("Chrome") || (userAgent.contains("Windows") && userAgent.contains("Trident"))){
			downloadFileName = URLEncoder.encode(downloadFileName, "utf-8");
			downloadFileName = downloadFileName.replaceAll("\\+","%20");
        }
		
		return downloadFileName;
	}
}
