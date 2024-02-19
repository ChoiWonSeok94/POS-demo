/************************************************
 * properties.module.js
 * Created at 2021. 12. 20. 오후 3:36:06.
 *
 * @author 
 ************************************************/

function AppProperties(){
};

//메인 app id
AppProperties.prototype.MAIN_APP_ID = "app/com/Main";

//NotificationCenter 메시지 구독 ID (메인에서 subscribe)
AppProperties.prototype.MSG_TOPIC_ID = "app-msg";

//공통 조회 버튼 ID (조회조건 초기화에서 사용)
AppProperties.prototype.SEARCH_BTN_ID = "btnSearch";

// 필수 css class명  ",(콤마)로 분리하며 처음과 마지막에 콤마가 꼭있어야 합니다.
AppProperties.prototype.M_REQUIRED_STYLE = ",require," ;

// 다이얼로그 최대 높이
AppProperties.prototype.DIALOG_MAX_HEIGHT = 760;

globals.AppProperties = new AppProperties();
