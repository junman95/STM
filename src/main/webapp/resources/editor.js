
var editor;
var QuestionList;
var passageDiv;
var choiceDiv;
var imgDiv;
var passageInput;
var choiceInput;
var contentDiv;
var jsonQuestionList=[];
var addedQuestionList=[];
var questionCount = 0;
var curColumnHeight = 0;

function testScript(){
   
   // addQuestionToTestPaper(0);
   addPage(1);
   
}
function testScript_re(){
   
   // removeQuestionFromTestPaper(0);
   
}


function assignQuestion(questionList){
   jsonQuestionList = questionList;
}
function makeTestPaper(htmlLink){

   createEditor();
   setTimeout(function(){
      createTestPaper(htmlLink);
   },1000);
   
}

function createEditor() {

   editor = CKEDITOR.replace('editor1', {
      // Define the toolbar:
      // http://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_toolbar
      // The full preset from CDN which we used as a base provides more
      // features
      // than we need.
      // Also by default it comes with a 3-line toolbar. Here we put all
      // buttons
      // in a single row.
      toolbar : [
            {
               name : 'document',
               items : [ 'Print' ]
            },
            {
               name : 'clipboard',
               items : [ 'Undo', 'Redo' ]
            },
            {
               name : 'styles',
               items : [ 'Format', 'Font', 'FontSize' ]
            },
            {
               name : 'basicstyles',
               items : [ 'Bold', 'Italic', 'Underline', 'Strike',
                     'RemoveFormat', 'CopyFormatting' ]
            },
            {
               name : 'colors',
               items : [ 'TextColor', 'BGColor' ]
            },
            {
               name : 'align',
               items : [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight',
                     'JustifyBlock' ]
            },
            {
               name : 'links',
               items : [ 'Link', 'Unlink' ]
            },
            {
               name : 'paragraph',
               items : [ 'NumberedList', 'BulletedList', '-', 'Outdent',
                     'Indent', '-', 'Blockquote' ]
            }, {
               name : 'insert',
               items : [ 'Image', 'Table' ]
            }, {
               name : 'tools',
               items : [ 'Maximize' ]
            }, {
               name : 'editing',
               items : [ 'Scayt' ]
            } ],
      // Since we define all configuration options here, let's instruct
      // CKEditor
      // to not load config.js which it does by default.
      // One HTTP request less will result in a faster startup time.
      // For more information check
      // http://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.config-cfg-customConfig
      customConfig : '',
      // Sometimes applications that convert HTML to PDF prefer setting image
      // width through attributes instead of CSS styles.
      // For more information check:
      // - About Advanced Content Filter:
      // http://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_advanced_content_filter
      // - About Disallowed Content:
      // http://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_disallowed_content
      // - About Allowed Content:
      // http://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_allowed_content_rules
      disallowedContent : 'img{width,height,float}',
      extraAllowedContent : 'img[width,height,align]',
      // Enabling extra plugins, available in the full-all preset:
      // http://ckeditor.com/presets-all
      extraPlugins : 'tableresize,uploadimage,uploadfile',
      /** ********************* File management support ********************** */
      // In order to turn on support for file uploads, CKEditor has to be
      // configured to use some server side
      // solution with file upload/management capabilities, like for example
      // CKFinder.
      // For more information see
      // http://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_ckfinder_integration
      // Uncomment and correct these lines after you setup your local CKFinder
      // instance.
      // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
      // filebrowserUploadUrl:
      // 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
      /** ********************* File management support ********************** */
      
      // An array of stylesheets to style the WYSIWYG area.
      // Note: it is recommended to keep your own styles in a separate file in
      // order to make future updates painless.
      contentsCss : [ 'https://cdn.ckeditor.com/4.8.0/full-all/contents.css',
             'resources/innerEditor.css' ],
      // This is optional, but will let us define multiple different styles
      // for
      // multiple editors using the same CSS file.
      bodyClass : 'document-editor',
      // Reduce the list of block elements listed in the Format dropdown to
      // the
      // most commonly used.
      format_tags : 'p;h1;h2;h3;pre',
      // Simplify the Image and Link dialog windows. The "Advanced" tab is not
      // needed in most cases.
      removeDialogTabs : 'image:advanced;link:advanced',
      // Define the list of styles which should be available in the Styles
      // dropdown list.
      // If the "class" attribute is used to style an element, make sure to
      // define
      // the style for the class in "mystyles.css"
      // (and on your website so that it rendered in the same way).
      // Note: by default CKEditor looks for styles.js file. Defining
      // stylesSet
      // inline (as below) stops CKEditor from loading
      // that file, which means one HTTP request less (and a faster startup).
      // For more information see
      // http://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_styles
      stylesSet : [
      /* Inline Styles */
      {
         name : 'Marker',
         element : 'span',
         attributes : {
            'class' : 'marker'
         }
      }, {
         name : 'Cited Work',
         element : 'cite'
      }, {
         name : 'Inline Quotation',
         element : 'q'
      },
      /* Object Styles */
      {
         name : 'Special Container',
         element : 'div',
         styles : {
            padding : '5px 10px',
            background : '#eee',
            border : '1px solid #ccc'
         }
      }, {
         name : 'Compact table',
         element : 'table',
         attributes : {
            cellpadding : '5',
            cellspacing : '0',
            border : '1',
            bordercolor : '#ccc'
         },
         styles : {
            'border-collapse' : 'collapse'
         }
      }, {
         name : 'Borderless Table',
         element : 'table',
         styles : {
            'border-style' : 'hidden',
            'background-color' : '#E6E6FA'
         }
      }, {
         name : 'Square Bulleted List',
         element : 'ul',
         styles : {
            'list-style-type' : 'square'
         }
      } ],
      
      
      resize_enabled : false,
      // Make the editing area bigger than default.
      height : '297mm',
      width : '230mm' // a4용지의 크기가 210mm이므로 에디터의 사이즈는 조금더 크게 설정
   });
   
}

var aryRealColumnHeight=[];
var questionHeight = [];
var aryColumnHeight=[];
var curPageNum = 0;
var curDivNum = 0;


function createTestPaper(htmlLink){
   
   aryColumnHeight[0] = new Array(2);
   aryRealColumnHeight[0] = new Array(2);
   pageQuestionList[0] = new Array(2);
   
   // 시험지 양식을 문제지에 로드
   if(htmlLink=="1"){
	   fetch("resources/dd2.html")
	   .then( response => response.text() )
   		.then( text => editor.document.getBody().setHtml(text))
   		.then( () => aryColumnHeight[curPageNum][curDivNum] = editor.document.getById('col_div_0_0').getComputedStyle('height'))
   		.then( () => aryColumnHeight[curPageNum][curDivNum+1] = editor.document.getById('col_div_0_1').getComputedStyle('height'));
   }
   else if(htmlLink!="1"){
	   fetch(htmlLink)
	   .then( response => response.text() )
	   .then( text => editor.document.getBody().setHtml(text))
	   .then( () => aryColumnHeight[curPageNum][curDivNum] = editor.document.getById('col_div_0_0').getComputedStyle('height'))
	   .then( () => aryColumnHeight[curPageNum][curDivNum+1] = editor.document.getById('col_div_0_1').getComputedStyle('height'));
   }
   contentDiv = editor.document.getById('content_div');
   
}



var aryQuestionDiv=[];
var aryPassageDiv=[];
var aryChoiceDiv=[];   // 해당문항의 모든 보기를 포함하는 Div
var aryChoiceNumDiv=[];   // 해당문항의 보기 각각을 포함하는 Div배열의 배열 (2차원 배열)
var aryImgDiv=[];
var questionPosition=[]; // questionDiv의 페이지와 column번호를 저장하는 배열 (2차원배열);
var isPageExist=[];

var pageQuestionList=[];
function sortQuestion(){
   
   for(var i=0; i<=curPageNum; i++){
      for(var j=0; j<2; j++){
         pageQuestionList[i][j] = new Array(5);
      }
   }
   
   for(var i=1; i<=questionCount; i++){
      pageQuestionList[questionPosition[i][0]][questionPosition[i][1]].push(i); 
   }
   
   for(var i=0; i<curPageNum; i++){
      for(var j=0; j<2; j++){
         pageQuestionList[i][j].sort();
         for(var k =0; k<pageQuestionList[i][j].length; k++){
            if(aryQuestionDiv[pageQuestionList[i][j][k]] == null)
               return;
            if(aryQuestionDiv[pageQuestionList[i][j][k]] === undefined)
               return;
            
            aryQuestionDiv[pageQuestionList[i][j][k]].appendTo(editor.document.getById("col_div_" + questionPosition[pageQuestionList[i][j][k]][0] + "_" + questionPosition[pageQuestionList[i][j][k]][1]));
         }
      }
   }
   
}


function addPage(pageNum){
   
   if(isPageExist[pageNum] == true){
      return;
   }
   
   isPageExist[pageNum] = true;
   
   var editor = CKEDITOR.instances.editor1;
   
   var page_div = CKEDITOR.dom.element.createFromHtml('<div class="page_div" id="page' + pageNum +'_div"></div>');
   
   var header_div = CKEDITOR.dom.element.createFromHtml('<div class="sub_header"></div>');
   header_div.appendTo(page_div);
   CKEDITOR.dom.element.createFromHtml('<hr color="#000" />').appendTo(page_div);
   var content_div = CKEDITOR.dom.element.createFromHtml('<DIV class="content" id="content_div_'+ pageNum +'"></div>');
   content_div.appendTo(page_div);
   
   var col_0 = CKEDITOR.dom.element.createFromHtml('<div class="column" id=col_div_'+ pageNum +'_0>');
   col_0.appendTo(content_div);
   var col_1 = CKEDITOR.dom.element.createFromHtml('<div class="column" id=col_div_'+ pageNum +'_1>');
   col_1.appendTo(content_div);
   CKEDITOR.dom.element.createFromHtml('<hr color="#000" />').appendTo(page_div);
   
   page_div.appendTo(editor.document.getBody());
   
   pageQuestionList[pageNum] = new Array(2);
   aryColumnHeight[pageNum] = new Array(2);
   aryRealColumnHeight[pageNum] = new Array(2);
   aryRealColumnHeight[pageNum][0] = 0;
   aryRealColumnHeight[pageNum][1] = 0;
   aryColumnHeight[pageNum][0] = col_0.getComputedStyle('height');
   aryColumnHeight[pageNum][1] = col_1.getComputedStyle('height');
   
   // 아래와 같은 html코드를 에디터 안에 생성합니다.
   /*
	 * <DIV class='page_div' id='page1_div'> <hr color='#000' /> <DIV
	 * class='content' id='content_div'> <div class="column" id=col_div_0_0>
	 * 
	 * </div> <div class="column" id=col_div_0_1></div>
	 * 
	 * </DIV> <hr color='#000' />
	 */
   
   // 기능과는 연관도가 낮은 추가적인 element들을 추가합니다.
   var sub_title = CKEDITOR.dom.element.createFromHtml('<div class="sub_header sub_title"></div>');
   sub_title.setText(editor.document.getById('test_paper_name').getText() + "<"+ editor.document.getById('subject').getText() + ">");
   sub_title.appendTo(header_div);
   CKEDITOR.dom.element.createFromHtml('<div class="sub_header sub_page_num">'+ (pageNum+1) +'</div>').appendTo(header_div);
   
   
   
}

// 새로페이지가 만들어지면 column div를 생성합니다.
function createColumnDiv(){
   
}

function createQuestionDiv(num){
   
   var questionDiv;
   var editor = CKEDITOR.instances.editor1;
   
   
   // column div를 얻어옵니다. (column_div는 여러 문제들이 속해 있는 div입니다. 상하관계는 contentDiv ->
   // columnDiv -> questionDiv)
   columnDiv = editor.document.getById('col_div_' + curPageNum + '_' + curDivNum);
   
   // questionDiv를 생성합니다. (questionDiv는 문제 하나가 속한 div입니다. 문제별로 questionDiv가
   // 존재합니다.)
   questionDiv = CKEDITOR.dom.element.createFromHtml('<div id="question_div_' + num + '"></div><br>');
   // aryQuestionDiv.push(questionDiv);
   aryQuestionDiv[num] = questionDiv;
   questionDiv.appendTo(columnDiv);
   
   // questionDiv가 생성되는 위치를 저장.
   // questionPosition[num] = [curPageNum, curDivNum];
   questionPosition[num] = new Array(2);
   questionPosition[num][0] = curPageNum;
   questionPosition[num][1] = curDivNum;
}

function createQuestionDiv_old(num){
      var questionDiv;
      var editor = CKEDITOR.instances.editor1;
      
      
      // content_div를 얻어옵니다. (content_div는 여러 문제들이 속해 있는 div입니다.)
      if(contentDiv == null){
        contentDiv = editor.document.getById('content_div');
      }
      
      // questionDiv를 생성합니다. (questionDiv는 문제 하나가 속한 div입니다. 문제별로 questionDiv가
      // 존재합니다.)
      questionDiv = CKEDITOR.dom.element.createFromHtml('<div id="question_div_' + num + '"></div><br>');
      // aryQuestionDiv.push(questionDiv);
      aryQuestionDiv[num] = questionDiv;
      questionDiv.appendTo(contentDiv);
   
}

function createPassageDiv(num){
   
   var passageDiv;
   
   passageDiv = CKEDITOR.dom.element
   .createFromHtml('<div id="passage_div_' + num + '"></div><br>');
   // CKEDITOR.instances.editor1.insertElement(passageDiv);
   // aryPassageDiv.push(passageDiv);
   aryPassageDiv[num] = passageDiv;
   passageDiv.appendTo(aryQuestionDiv[num]);
}

function createImgDiv(num){
   
   var imgDiv;
   
   imgDiv = CKEDITOR.dom.element
   .createFromHtml('<div id="img_div_' + num + '"></div><br>');
   // CKEDITOR.instances.editor1.insertElement(imgDiv);
   // aryImgDiv.push(imgDiv);
   aryImgDiv[num] = imgDiv;
   imgDiv.appendTo(aryQuestionDiv[num]);
}

function createChoiceDiv(num){
   
   var choiceDiv;
   
   choiceDiv = CKEDITOR.dom.element
   .createFromHtml('<div id="choice_div_' + num + '"></div><br>');
   // CKEDITOR.instances.editor1.insertElement(choiceDiv);
   // aryChoiceDiv.push(choiceDiv);
   aryChoiceDiv[num] = choiceDiv;
   choiceDiv.appendTo(aryQuestionDiv[num]);
}

function createChoiceNumDiv(questionNum, choiceNum){
   
   var choiceNumDiv;
   
   choiceNumDiv = CKEDITOR.dom.element.createFromHtml('<div id="choice_div_'+ questionNum +'_' + choiceNum + '"></div><br>');
   // aryChoiceNumDiv[questionNum].push(choiceNumDiv);
   aryChoiceNumDiv[questionNum][choiceNum] = choiceNumDiv;
   choiceNumDiv.appendTo(aryChoiceDiv[questionNum]);
   
}


function addQuestionToEditor(questionNum){
   
   createQuestionDiv(questionCount);
   
   // passageDiv 생성 및 값설정
   createPassageDiv(questionCount);
   var passage = "<b>" + questionCount + ".<b> " + jsonQuestionList[questionNum].passage;
   aryPassageDiv[questionCount].setHtml(passage);
   
   // imgDiv 생성 및 값설정 (이미지가 있을 경우에만)
   
   if(jsonQuestionList[questionNum].imageLink != null){
      createImgDiv(questionCount);
      aryImgDiv[questionCount].setHtml("<img src='" + jsonQuestionList[questionNum].imageLink + "' />");
   }
   
   // choiceDiv 생성 및 값설정 (객관식 문제인 경우에만)
   if(jsonQuestionList[questionNum].mulORSub == 0){
      createChoiceDiv(questionCount);
      aryChoiceNumDiv[questionCount] = new Array();   // 2차원 배열 선언
      
      // 1번보기
      if(jsonQuestionList[questionNum].mulChoice_one != null){
         createChoiceNumDiv(questionCount, 0);
         aryChoiceNumDiv[questionCount][0].setText(jsonQuestionList[questionNum].mulChoice_one);
      }
      // 2번보기
      if(jsonQuestionList[questionNum].mulChoice_two != null){
         createChoiceNumDiv(questionCount, 1);
         aryChoiceNumDiv[questionCount][1].setText(jsonQuestionList[questionNum].mulChoice_two);
      }
      // 3번보기
      if(jsonQuestionList[questionNum].mulChoice_three != null){
         createChoiceNumDiv(questionCount, 2);
         aryChoiceNumDiv[questionCount][2].setText(jsonQuestionList[questionNum].mulChoice_three);
      }
      // 4번보기
      if(jsonQuestionList[questionNum].mulChoice_four != null){
         createChoiceNumDiv(questionCount, 3);
         aryChoiceNumDiv[questionCount][3].setText(jsonQuestionList[questionNum].mulChoice_four);
      }
      // 5번보기
      if(jsonQuestionList[questionNum].mulChoice_five != null){
         createChoiceNumDiv(questionCount, 4);
         aryChoiceNumDiv[questionCount][4].setText(jsonQuestionList[questionNum].mulChoice_four);
      }
   }
   
   CKEDITOR.dom.element.createFromHtml('<br><br>').appendTo(aryQuestionDiv[questionCount]);
   
}


function checkColumn_add(questionNum){
   
   var curQuestionHeight = parseInt(aryQuestionDiv[questionCount].getComputedStyle('height')); 
   questionHeight[questionCount] = curQuestionHeight;
   curColumnHeight += parseInt(aryQuestionDiv[questionCount].getComputedStyle('height')); 

   aryRealColumnHeight[questionPosition[questionCount][0]][questionPosition[questionCount][1]] = curColumnHeight;
      if(parseInt(aryColumnHeight[curPageNum][curDivNum]) < curColumnHeight){
         
         // 칸을 넘겼으니 그려진 문제들을 지우고 다음 div에 다시그립니다.
         aryRealColumnHeight[curPageNum][curDivNum] = (curColumnHeight-curQuestionHeight);
         curColumnHeight = curQuestionHeight;
         removeQuestionFromEditor(questionCount);
         curDivNum++;
         
         // 다음페이지로 넘어 가야하는 경우.
         if(curDivNum >= 2){
            curDivNum = 0;
            curPageNum++;
            addPage(curPageNum);
         }
         aryRealColumnHeight[curPageNum][curDivNum] = curColumnHeight;
         addQuestionToEditor(questionNum);
      }
   
}

function checkColumn_remove(questionNum){

   if(questionNum != null){
      aryRealColumnHeight[questionPosition[questionNum][0]][questionPosition[questionNum][1]] -= questionHeight[questionNum];
   }
   curColumnHeight = aryRealColumnHeight[curPageNum][curDivNum];
   if(curColumnHeight < 100){ // 대략 100
      // 칸을 넘겼으니 그려진 문제들을 지우고 다음 div에 다시그립니다.
      aryRealColumnHeight[curPageNum][curDivNum] = 0;

      if((curDivNum == 0) && (curPageNum >0)){
         curDivNum = 1;
         // 이전 페이지로 되돌아간다. 생성된 페이지도 지운다.
         editor.document.getById("page" + curPageNum + "_div").remove();
         isPageExist[curPageNum] = false;
         curPageNum--;
      }
      else if(curDivNum == 1){
         curDivNum--;
      }
      
      curColumnHeight = aryRealColumnHeight[curPageNum][curDivNum];
      
      // 재귀적으로 col체크
      if((curDivNum > 0) && (curPageNum > 0)){
      checkColumn_remove(null);
      }
   }
   
}

function correctQuestionOrder(){
   for(var i=0; i < curPageNum; i++){
      for(var j = 0; j<=1; j++){
         var targetCol = editor.document.getById("col_div_" + i + "_" + j);
         var aryChild = targetCol.children;
         for(var k=0; k<aryChild.length-1; k++){
            if(aryChild[k].children[0][0] > aryChild[k+1].children[0][0]){
               aryChild[k].appendTo(targetCol);
               k=0;
            }
            /*
			 * for(var g=k; g<aryChild.length; g++){
			 * if(aryChild[k].children[0][0] >aryChild[g].children[0][0] }
			 */
         }
      }
   }
   
}

// 앞의 문제가 제거되면 뒤의 문제들을 앞으로 당기는 함수.
function alignEditor(removedQuestionNum){
   var removedQuestionPageNum = questionPosition[removedQuestionNum][0];
   var removedQuestionColumnNum = questionPosition[removedQuestionNum][1];
   
   var questionNumToMove = removedQuestionNum + 1;
   if(questionNumToMove > questionCount+1){
      return;
   }
   while((removedQuestionPageNum==questionPosition[questionNumToMove][0]) && (removedQuestionColumnNum == questionPosition[questionNumToMove][1])){
      questionNumToMove++;
      if(questionNumToMove > questionCount+1){
         return;
      }
   }
   
   // 문제를 이동시키더라도 문제가 없는 경우.
   if((aryRealColumnHeight[removedQuestionPageNum][removedQuestionColumnNum]+questionHeight[questionNumToMove])<= parseInt(aryColumnHeight[removedQuestionPageNum][removedQuestionColumnNum])){
      // 문제를 옮긴다.
      aryQuestionDiv[questionNumToMove].appendTo(editor.document.getById('col_div_' +removedQuestionPageNum+ '_' + removedQuestionColumnNum));
      
      // 옮겨짐으로 인해 변견된 column들의 높이를 다시 계산.
      // 옮기기전 column의 높이 계산.
      aryRealColumnHeight[questionPosition[questionNumToMove][0]][questionPosition[questionNumToMove][1]] -= questionHeight[questionNumToMove];
      
      
      // 옮겨진 column의 높이 계산.
      aryRealColumnHeight[removedQuestionPageNum][removedQuestionColumnNum] += questionHeight[questionNumToMove];
      // 옮겨진 문제의 위치를 다시 저장.
      questionPosition[questionNumToMove][0] = removedQuestionPageNum;
      questionPosition[questionNumToMove][1] = removedQuestionColumnNum;

      curColumnHeight = aryRealColumnHeight[curPageNum][curDivNum];
      checkColumn_remove(null);
      
      // 하나의 문제가 옮겨 졌다면 재귀적으로 그 뒤의 문제들도 이동.
      alignEditor(questionNumToMove);
   }
   else{
      // 일단 컬럼 두개 이상 벌어지면 chain이 끊김.
      if(removedQuestionColumnNum == 0){
         removedQuestionColumnNum++;
      }
      else if(removedQuestionColumnNum == 1){
         removedQuestionPageNum++;
         removedQuestionColumnNum = 0;
      }
      
      // 문제를 옮긴다.
      aryQuestionDiv[questionNumToMove].appendTo(editor.document.getById('col_div_' +removedQuestionPageNum+ '_' + removedQuestionColumnNum));
      
      // 옮겨짐으로 인해 변견된 column들의 높이를 다시 계산.
      // 옮기기전 column의 높이 계산.
      aryRealColumnHeight[questionPosition[questionNumToMove][0]][questionPosition[questionNumToMove][1]] -= questionHeight[questionNumToMove];
      // 옮겨진 column의 높이 계산.
      aryRealColumnHeight[removedQuestionPageNum][removedQuestionColumnNum] += questionHeight[questionNumToMove];
      // 옮겨진 문제의 위치를 다시 저장.
      questionPosition[questionNumToMove][0] = removedQuestionPageNum;
      questionPosition[questionNumToMove][1] = removedQuestionColumnNum;
      
      // 이 구간에 진입했다는 것은 (questionNumToMove+1)이 무조건 다음 column에 위치한다는 것을 의미함.
      // 다음 column에 대해서도 문제들을 정렬 시켜 줘야함.
      if(questionNumToMove < questionCount+1){
         alignEditor(questionNumToMove);
      }
      curColumnHeight = aryRealColumnHeight[curPageNum][curDivNum];
      checkColumn_remove(null);
      
      
   }   
}

function alignQuestions(questionNum){
   // 정렬 대상
   // var aryQuestionDiv=[]; //index1 부터 사용됨
   // var aryPassageDiv=[];
   // var aryChoiceDiv=[]; // 해당문항의 모든 보기를 포함하는 Div
   // var aryChoiceNumDiv=[]; // 해당문항의 보기 각각을 포함하는 Div배열의 배열 (2차원 배열)
   // var aryImgDiv=[];
   // var questionHeight = []; //index1 부터 사용됨
   
   // var questionPosition = [] //2차원배열
   // var aryColumnHeight=[];
   
   // 아래와 같은 로직이 작동하기위해서는 문제를 제거한 뒤 해당 인덱스를 null값으로 지정해야함.
   for(var i=1; i<=questionCount; i++){
      
      if(aryQuestionDiv[i] == null){
         for(var j=i+1; j <=questionCount+1; j++){
            aryQuestionDiv[j].removeAttribute('id');
            aryQuestionDiv[j].setAttribute('id', 'question_div_'+(j-1));
            
            aryPassageDiv[j].setText(aryPassageDiv[j].getText().replace(j,(j-1)));
            alignEditor(questionNum);
            
            // 배열을 중간에 없어진 문제의 인덱스부터 한칸씩 당김.
            aryQuestionDiv[j-1] = aryQuestionDiv[j];
            aryPassageDiv[j-1] = aryPassageDiv[j];
            aryChoiceDiv[j-1] = aryChoiceDiv[j];
            aryChoiceNumDiv[j-1] = aryChoiceNumDiv[j];
            aryImgDiv[j-1] = aryImgDiv[j];
            
            questionPosition[j-1] = questionPosition[j];
            questionHeight[j-1] = questionHeight[j];
            
            // 이벤트 리스너도 변경함.
            $("#selected-"+j).attr("onclick","removeWrapper(" + (j-1) + ")");
            $("#selected-"+j).attr("id", "selected-"+(j-1));
            
         }
      }
   }
}


function addQuestionToAddedList(questionNum){
   
   // 웹페이지의 뷰에서도 추가된 리스트를 보이도록 한다.
   addedQuestionList.push(jsonQuestionList[questionNum]);
}

function addQuestionToTestPaper(questionNum){
   questionCount++;
   // 문제를 추가하면 추가된 목록에 포함시킨다.
   addQuestionToAddedList(questionNum);
   // 추가된 문제를 에디터에 출력되도록 한다.
   // addQuestionToEditor(questionNum).then(checkColumn(questionNum));
   addQuestionToEditor(questionNum);
   setTimeout(function() {checkColumn_add(questionNum)}, 100);
}

function removeQuestionFromAddedList(questionNum){
   addedQuestionList.splice(questionNum,1);
}

function removeQuestionFromEditor(questionNum){
   aryQuestionDiv[questionNum].remove();
   
}

function removeQuestionFromTestPaper(questionNum){

   questionCount--;
   // 문제를 삭제하면 추가된 목록에서 삭제시킨다.
   removeQuestionFromAddedList(questionNum);
   // 삭제된 문제를 에디터에서 제거되도록 한다.
   checkColumn_remove(questionNum);
   setTimeout(function(){
      removeQuestionFromEditor(questionNum);
      aryQuestionDiv[questionNum] = null;
      // alignEditor(questionNum);
      
      alignQuestions(questionNum);
      alignEditor(1);
      setTimeout(sortQuestion(),100);
      }, 300);
   
}

function createDivNum(num) {

   var questionDiv;
   var passageDiv;
   var choiceDiv;
   var imgDiv;
   
   // content_div를 얻어옵니다. (content_div는 여러 문제들이 속해 있는 div입니다.)
   if(contentDiv == null){
      contentDiv = editor.document.getById('content_div');
   }
   
   // questionDiv를 생성합니다. (questionDiv는 문제 하나가 속한 div입니다. 문제별로 questionDiv가
   // 존재합니다.)
   questionDiv = CKEDITOR.dom.element.createFromHtml('<div id="content_div_' + num + '"></div><br>');
   aryQuestionDiv.push(questionDiv);
   questionDiv.appendTo(contentDiv);
   
      passageDiv = CKEDITOR.dom.element
            .createFromHtml('<div id="passage_div_' + num + '"></div><br>');
      // CKEDITOR.instances.editor1.insertElement(passageDiv);
      aryPassageDiv.push(passageDiv);
      passageDiv.appendTo(questionDiv);
      
      imgDiv = CKEDITOR.dom.element
            .createFromHtml('<div id="img_div_' + num + '"></div><br>');
      // CKEDITOR.instances.editor1.insertElement(imgDiv);
      aryImgDiv.push(imgDiv);
      imgDiv.appendTo(questionDiv);
      

      choiceDiv = CKEDITOR.dom.element
            .createFromHtml('<div id="choice_div_' + num + '"></div><br>');
      // CKEDITOR.instances.editor1.insertElement(choiceDiv);
      aryChoiceDiv.push(choiceDiv);
      choiceDiv.appendTo(questionDiv);
      
}

function loadQuestionList_old2(jsonQuestionList) {
   for(var i=0; i<jsonQuestionList.length; i++){
      createDivNum(i);
      passageDiv[i].setText(jsonQuestionList[i].passage);
      imgDiv[i].setHtml("<img id='question_img_" + i + "' width='" + 300 + "' src='" + jsonQuestionList[i].imageLink + "' >");
      choiceDiv[i].setText(jsonQuestionList[i].mulChoice_one);
   }
   alert(jsonQuestionList[0].passage);

}

function createForm() {
   var editor = CKEDITOR.instances.editor1;

   setTimeout(function(){questionDiv = editor.document.getById('question_div');alert(questionDiv)}, 3000)
   // questionDiv = editor.document.getById('question_div');
}

function loadQuestionList_old(jsonQuestionList) {
   document.getElementById('editor1').innerHTML = "<div id=\'question"
         + questionCount + "\'>" + jsonQuestionList[0].passage + "</div>";
   document.getElementById('editor1').innerHTML = "<img src=  \'"  + jsonQuestionList[0].imageLink  + "\' />";
   alert(jsonQuestionList[0].passage);

}

function insertQuestion() {
   questionCount +=1;
   createDiv(questionCount);
}
function removeQuestion() {
}



function createDiv() {

   var body = CKEDITOR.instances.editor1.document.getBody();
   
   questionDiv = CKEDITOR.dom.element.createFromHtml('<div id="question_div"></div><br>');
   aryQuestionDiv.push(questionDiv);
   questionDiv.appendTo(body);
   
   createPassageDiv(0);
   createImgDiv(0);
   createChoiceDiv(0);
   createChoiceNumDiv(0, 0);
   createChoiceNumDiv(0, 1);
   createChoiceNumDiv(0, 2);
   createChoiceNumDiv(0, 3);
   createChoiceNumDiv(0, 4);
   
}


function onPassageChange() {

   if (aryPassageDiv[0] == null) {
      createDiv();
   }
   if (passageInput == null) {
      passageInput = document.getElementById('passageInput');
   }
   aryPassageDiv[0].setHtml("<b>" + passageInput.value + "</b>");

   aryPassageDiv[0].focus();

}


var passageDiv_;
var imgDiv;
var choiceDiv=[];



function onChoiceChange(num) {
   if (aryChoiceNumDiv[num] == null) {
      createDiv();
   }
   if (passageInput == null) {
      passageInput = document.getElementById('passageInput');
   }
   aryChoiceNumDiv[num].setHtml("<b>" + passageInput.value + "</b>");

   aryChoiceNumDiv[num].focus();  
}

function onFileSelected(file) {

   // 파일의 인자로 input element의 files를 전달받습니다.

   if (aryImgDiv[0] == null) {
      createDiv();
   }

   var fileReader = new FileReader();
   // fileReader객체로 input 태그에서 받아온 첫번째 파일의 URL을 받아옵니다.
   fileReader.readAsDataURL(file[0]);

   // 파일을 다읽어오면 콜백onload합수로 이미지 태그를 에디터안에 넣어줍니다.
   fileReader.onload = function() {
      aryImgDiv[0].setHtml('<img id=\"preview1\" width=\'' + 300 + '\' src=\''
            + fileReader.result + '\' >');
      setTimeout(function(){
        document.querySelector("#editordiv").style.height=3508;
        },1000);
   }
}

function loadQuestionList() {
	var n = 0;
	// 이 부분을 작성해주세요.
	// jsonQuestionList는 서버에서 전달된 문제 배열입니다.
	// 이 배열에 있는 문제를 웹페이지에 나열해주세요.
	// +추가적으로 사용자가 문제를 선택하면 addQuestionToEditor(num)을 호출해주세요.
	// num은 jsonQuestionList에서의 인덱스입니다.
	while (jsonQuestionList[n] != null) {
		
		var question = jsonQuestionList[n].capimageLink;
		// 이미지 태그 제작
		if(n%6==0 && n>0){
			appendRow(n);
			$(".row-question").hide();
			$(".row-0").fadeIn(1000);
		}
		console.log(question);
		setTimeout(appendChild(question,n),2000);
		n++;
	}
	for(var i=0;i<n;i++){
		setTimeout(addOnclick(i),5000);
	}
}

//pdf저장&프린트 제공
function print_testpaper(){
	   var popupWindow = window.open("", "_blank" );

	   popupWindow.document.write(editor.document.getHead().getHtml());
	   popupWindow.document.write(editor.document.getBody().getHtml());
	   
	   popupWindow.document.close();
	   popupWindow.onload = function(){popupWindow.print();};
	   
	}

// 시험지 html 정보 모두 전송
function submit_testpaper(){
    document.getElementById('testpaper_html').value = "<link rel='stylesheet' href='http://localhost:8181/st2m/resources/innerEditor.css'>" + CKEDITOR.instances.editor1.document.getBody().getHtml();
    document.getElementById('form_testpaper_html').submit();
    
 }

function hello(){
	console.log("hello");
}


var current_row=0;
function btnOnclick_left(){
	var next_row=current_row-1;
	if(current_row!=0){
		$(".row-question").fadeOut(500);
		setTimeout(function(){$(".row-"+next_row).fadeIn(500)},500);
		$(".row-"+current_row).removeClass('on');
		$(".row-"+current_row).addClass('off');
		$(".row-"+next_row).removeClass('off');
		$(".row-"+next_row).addClass('on');
		current_row-=1;
		
		$(".btn-right").show();
		if(current_row==0){
			$(".btn-left").hide();
		}
	}
}
function btnOnclick_right(){
	var next_row=current_row+1;
	console.log(next_row);
	if($(".row-"+next_row).val()!=null){
		$(".row-question").fadeOut(500);
		setTimeout(function(){$(".row-"+next_row).fadeIn(500)},500);
		$(".row-"+current_row).removeClass('on');
		$(".row-"+current_row).addClass('off');
		$(".row-"+next_row).removeClass('off');
		$(".row-"+next_row).addClass('on');
		current_row+=1;

		$(".btn-left").show();
		if($(".row-"+(next_row+1)).val()==null){
			$(".btn-right").hide();
		}
	}
}

function addOnclick(n){
	   console.log(n);
	   $("#capimg-"+n).attr("onclick","appendBottomDiv("+n+");");
	}

	function appendBottomDiv(n){
	   
	   // QuestionCount를 먼저 증가시킨다.
	   addQuestionToTestPaper(n);
	   
	   var img = document.createElement("img");
	   img.src=document.getElementById("capimg-"+n).src;
	   img.id="selected-"+questionCount;
	   // img.onclick = function() { removeWrapper(questionCount) };
	   var div = document.getElementById("selectedQuestions");
	   div.append(img);
	   
	   
	   $("#selected-"+questionCount).attr("onclick","removeWrapper(" + questionCount + ")");
	   
	}
// 새 row생성
function appendRow(n){
	var row_no=n/6;
	var br=document.createElement("br");
	// 윗줄 문제 컨테이너 row
	var row_up = document.createElement("div");
	row_up.classList.add("row");
	row_up.classList.add("row-question");
	row_up.classList.add("row-"+row_no);
	row_up.classList.add("off");
	row_up.id="row-up";
	row_up.setAttribute("value",row_no);
	// 아랫줄 문제 컨테이너 row
	var row_down = document.createElement("div");
	row_down.classList.add("row");
	row_down.classList.add("row-question");
	row_down.classList.add("row-"+row_no);
	row_down.classList.add("off");
	row_down.id="row-down";
	row_down.setAttribute("value",row_no);
	
	var row_container = document.getElementById("row-container");
	row_container.append(row_up);
	// row_container.append(br);
	row_container.append(row_down);
	
	// row 안의 img div들 생성
	for(var i=0;i<3;i++){
		// 윗열
		var img_div_up=document.createElement("div");
		img_div_up.id="img-"+(n+i);
		img_div_up.classList.add("col-lg-4");
		img_div_up.classList.add("col-md-4");
		img_div_up.classList.add("col-sm-4");
		img_div_up.classList.add("col-xs-4");
		img_div_up.classList.add("div-img");
		row_up.append(img_div_up);
		// 아랫열
		var img_div_down=document.createElement("div");
		img_div_down.id="img-"+(n+i+3);
		img_div_down.classList.add("col-lg-4");
		img_div_down.classList.add("col-md-4");
		img_div_down.classList.add("col-sm-4");
		img_div_down.classList.add("col-xs-4");
		img_div_down.classList.add("div-img");
		row_down.append(img_div_down);
	}
}
// 문제리스트 생성
function appendChild(question,n) {
	var img = document.createElement("img");
	img.src=question;
	img.id="capimg-"+n;
	img.classList.add("image-popup-no-margins");
	var div = document.getElementById("img-"+n);
	if(img.src!=null){
		div.append(img);
	}
}

function removeWrapper(n){
	removeQuestionFromTestPaper(n);
	$("#selected-"+n).remove();
}