package com.pos.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.cleopatra.ui.PageGenerator;


@Controller
public class CleopatraUIController {

	public CleopatraUIController() {
    }

    @PostConstruct
    private void initPageGenerator() {
        PageGenerator instance = PageGenerator.getInstance();
        instance.setURLSuffix(".clx");
    }

    @RequestMapping("/**/*.clx")
    public View index(HttpServletRequest request, HttpServletResponse response) throws IOException {
        return new UIView();
    }

	@RequestMapping("/sample.do")
    public View Sample(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws IOException{

        /**
         * DataRequest : 서브미션 통신에 대한 데이터
         * ParameterGroup : 서브미션 request 데이터를 받음
         * JSONDataView : eXBuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
         */
        ParameterGroup param = dataRequest.getParameterGroup("dmSample"); //서브미션에서 설정한 요청데이터 ID작성(데이터셋,데이터맵등)
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("sample", param.getValue("colNm"));
//        List<Map<String, Object>> getSampleList = this.Sample.getSampleList(paramMap); 

        //응답데이터를 설정합니다.
//        dataRequest.setResponse("dsList", getSampleList );
        //JSON형태로 화면에 전달합니다.
        return new JSONDataView();
    }
}
