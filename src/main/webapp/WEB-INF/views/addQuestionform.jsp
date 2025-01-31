<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>

<head>
<title>문제 추가하기</title>
<script src="https://cdn.ckeditor.com/4.8.0/full-all/ckeditor.js"></script>
<script
   src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript"
   src="${pageContext.request.contextPath}/resources/html2canvas.js"></script>
<script
   src="${pageContext.request.contextPath}/resources/addQuestion_editor.js"></script>
<link
   href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
   rel="stylesheet" id="bootstrap-css">
<script
   src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
   href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet"
   href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
<!--  Scripts-->
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script
   src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>
   function onLoad() {
      $("body").fadeIn(3000);
      createEditor();

   }
   document.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
         event.preventDefault();
      }
   }, true);
</script>
<script language="javascript">
   $(
         function() {
            $('#btn_submit')
                  .click(
                        function() {
                           html2canvas(
                                 document
                                       .querySelector("#captureDiv"))
                                 .then(
                                       function(canvas) {
                                          var image = new Image();
                                          image = canvas
                                                .toDataURL("image/png");
                                          console.log($(
                                                "#capimgData")
                                                .val(image));
                                          document
                                                .getElementById("CapValue").value = image;
                                          $("#btnfinal").trigger(
                                                'click');
                                       })
                        })
         })
</script>
</head>

<body onload="onLoad();fadeIn()">
   <header id="main_header">
      <div class="div-nav">
         <button class=" btn-home" onclick="window.location.href='./home'">STM</button>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <text class="text-page">문제 추가하기</text>
         <form style="top: 0px; bottom: 100%" action="logout" method="post">
            <button class="btn-logout">Logout</button>
         </form>
      </div>
   </header>
   <!-- 섹션 부분 시작 -->
   <section id="main_section">
      <div style="width: 1000px; height: 580px;">
         <div class="container-fluid">
            <div class="container-fluid">
               <div class="tab-content custom-tab-content">
                  <div>

                     <!-- Nav tabs -->
                     <ul class="nav nav-tabs custom-tab" role="tablist">
                        <li role="presentation" class="active"><a href="#home"
                           aria-controls="home" role="tab" data-toggle="tab"><i
                              class="glyphicon icon"></i><span class="link-lable">
                                 객관식</span></a></li>
                        <li role="presentation" onclick="location.href='./addQuestion2'"><a href="#messages"
                           aria-controls="messages" role="tab" data-toggle="tab"><i
                              class="glyphicon"></i><span class="link-lable"> 주관식</span></a></li>
                     </ul>

                     <div class="tab-content">
                        <!-- 객관식 부분 -->
                        <div role="tabpanel" class="tab-pane fade in active" id="home" >
                           <div class="container-fluid ">
                              <div class="row">
                                 <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"
                                    style="padding: 0px">
                                    <form:form modelAttribute="questionVO"
                                       action="registerQuestion" method="POST"
                                       onSubmit="return Validate()" name="infos"
                                       enctype="multipart/form-data">
                                       <div>
                                          <!-- 지문 입력 -->
                                          <textarea cols="num" rows="num" path="passage"
                                             name="passage" id="passageInput" class="outterB topC"
                                             placeholder="지문을 입력해주세요" required="" autofocus=""
                                             onkeyup="onPassageChange();"></textarea>

                                          <div id="username_error" class="val_error"></div>
                                       </div>

                                       <div class="filebox">
                                          <label for="ex_filename">이미지 업로드</label> <input
                                             type="file" id="ex_filename" class="upload-hidden"
                                             type="file" name="file" placeholder="파일 선택"
                                             onchange="onFileSelected(this.files)"> <input
                                             class="upload-name" value="파일선택" disabled="disabled">
                                       </div>
                                       <div class="outterB bottomC">
                                          <div>
                                             <label style="font-size: 15pt;">①&nbsp</label>
                                             <form:input path="mulChoiceOne" name="mulChoiceOne"
                                                placeholder="1번 보기" autofocus="" required="" id="mulChoice_1"
                                                onkeyup="onChoiceChange_1();" class="bgInsert" type="text"></form:input>
                                          </div>
                                          <div>
                                             <label style="font-size: 15pt;">②&nbsp</label>
                                             <form:input path="mulChoiceTwo" name="mulChoiceTwo"
                                                placeholder="2번 보기" autofocus="" required="" id="mulChoice_2"
                                                onkeyup="onChoiceChange_2();" class="bgInsert" type="text"></form:input>
                                          </div>
                                          <div>
                                             <label style="font-size: 15pt;">③&nbsp</label>
                                             <form:input path="mulChoiceThree" name="mulChoiceThree"
                                                placeholder="3번 보기" autofocus="" required="" id="mulChoice_3"
                                                onkeyup="onChoiceChange_3();" class="bgInsert" type="text"></form:input>
                                          </div>
                                          <div>
                                             <label style="font-size: 15pt;">④&nbsp</label>
                                             <form:input path="mulChoiceFour" name="mulChoiceFour"
                                                placeholder="4번 보기" autofocus="" required="" id="mulChoice_4"
                                                onkeyup="onChoiceChange_4();" class="bgInsert" type="text"></form:input>
                                          </div>
                                          <div>
                                             <label style="font-size: 15pt;">⑤&nbsp</label>
                                             <form:input path="mulChoiceFive" name="mulChoiceFive"
                                                placeholder="5번 보기" autofocus="" required="" id="mulChoice_5"
                                                onkeyup="onChoiceChange_5();" class="bgInsert" type="text"></form:input>
                                          </div>
                                       </div>
                                       <div>
                                          <label class="label-answer">정답 입력</label> <label
                                             style="font-size: 18pt;">&nbsp;&nbsp;①&nbsp;</label><input
                                             type="radio" name="answer" value="1" path="answer"
                                             name="answer"></input> <label style="font-size: 18pt;">&nbsp;&nbsp;②&nbsp;</label><input
                                             type="radio" name="answer" value="2" path="answer"
                                             name="answer"></input> <label style="font-size: 18pt;">&nbsp;&nbsp;③&nbsp;</label><input
                                             type="radio" name="answer" value="3" path="answer"
                                             name="answer"></input> <label style="font-size: 18pt;">&nbsp;&nbsp;④&nbsp;</label><input
                                             type="radio" name="answer" value="4" path="answer"
                                             name="answer"></input> <label style="font-size: 18pt;">&nbsp;&nbsp;⑤&nbsp;</label><input
                                             type="radio" name="answer" value="5" path="answer"
                                             name="answer"></input>
                                       </div>
                                       <form:input path="CapValue" name="CapValue" autofocus=""
                                          required="" type="hidden" id="CapValue"></form:input>

                                       <button id="btnfinal" type="submit"></button>
                                    </form:form>
                                
                                    <button onclick="location.href='./addQuestion'" 
                                       class="fix-refreshbutton btn-new">새로만들기</button>
                                 </div>

                                 <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"
                                    style="text-align: center">

                                    <div class="outterB rightC" id="editordiv">
                                       <div id="capimgLabel">
                                          <h2>
                                             <label for="editor1">문제 프리뷰</label>
                                          </h2>
                                       </div>
                                       <div class="printBtnZone" align="right">
                                          <button id="btn_submit" class="fix-savebutton btn-save">저장</button>
                                       </div>
                                       <div id="ck">
                                          <form name="capimgForm" id="capimgForm"
                                             enctype="multipart/form-data"
                                             method="post">
                                             <input type="hidden" id="capimgData" name="capimgData">
                                             <div id="captureDiv">
                                                <br>
                                                <div id="editor1" contenteditable="true"></div>
                                                <button id="btnfinal" hidden></button>
                                             </div>
                                          </form>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </section>
</body>
</html>

<style>
.custom-tab>li>a {
   -webkit-border-radius: 0;
   -moz-border-radius: 0;
   border-radius: 0;
}

.custom-tab>li {
   -webkit-border-radius: 0;
   -moz-border-radius: 0;
   border-radius: 0;
   font-family: mbcL;
   font-size: 15pt;
}

.custom-tab>li>a:link {
   border-top: 3px solid #00bfff;
   border-right: 1px solid #00bfff;
   border-left: 1px solid #00bfff;
}

.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover,
   .nav-tabs>li.active>a:visited {
   background-color: #00bfff;
   border-top: 3px solid #00bfff;
   border-right: 1px solid #00bfff;
   border-left: 1px solid #00bfff;
   color: #FFF;
   background-color: #00bfff;
}

i {
   color: #000;
   color: white;
}

.link-lable {
   text-decoration: none;
}

@media screen and (max-width: 767px) {
   .link-lable {
      display: none;
   }
}
/*---------------객관식----------------*/
.filebox input[type="file"] {
   position: absolute;
   width: 1px;
   height: 1px;
   padding: 0;
   margin: -1px;
   overflow: hidden;
   clip: rect(0, 0, 0, 0);
   border: 0;
   cursor: pointer;
}

.filebox label {
   font-size: 15pt;
   font-family: mbcL;
   color: white;
   text-align: center;
   border-radius: 8px;
   border: none;
   width: 150px;
   padding: 5px;
   background: rgb(49, 207, 255);
   cursor: pointer;
   font-weight: lighter;
}
/* named upload */
.filebox .upload-name {
   width: 310px;
   display: inline-block;
   padding: 5px; /* label의 패딩값과 일치 */
   font-size: inherit;
   font-family: inherit;
   line-height: normal;
   vertical-align: middle;
   background-color: #f5f5f5;
   border: 1px solid #ebebeb;
   border-bottom-color: #e2e2e2;
   border-radius: .25em;
   -webkit-appearance: none; /* 네이티브 외형 감추기 */
   -moz-appearance: none;
   appearance: none;
   padding: 5px;
}

.imgULB {
   font-size: 15pt;
   font-family: mbcL;
   font-weight: lighter;
   color: white;
   text-align: center;
   border-radius: 8px;
   border: none;
   width: 150px;
   padding: 5px;
   background: rgb(49, 207, 255);
}

.outterB {
   border-style: solid;
   border-width: 3pt;
   border-color: rgb(51, 196, 241);
   border-radius: 50px;
}

.topC {
   margin-right: 10px;
   margin-bottom: 5px;
   margin-top: 15px;
   padding: 30px;
   height: 250px;
   width: 470px;
   font-size: 13pt;
}

.bottomC {
   margin-right: 10px;
   margin-top: 5px;
   height: 230px;
   padding: 10px;
   padding-top: 23px;
   font-size: 13pt;
}

.rightC {
   height: 570px;
   margin-top: 15px;
}

.bgInsert { /*객관식 보기 입력*/
   font-size: 13pt;
   border: none;
   width: 400px;
}

.exp {
   font-family: mbcL;
   color: rgb(64);
   font-size: 15pt;
}

.label-answer {
   color: white;
   background-color: rgb(49, 207, 255);
   border-radius: 8px;
   border: none;
   color: #FFFFFF;
   text-align: center;
   width: 150px;
   font-size: 18pt;
   font-family: mbcL;
   padding: 3px;
   margin-top: 10px;
   font-weight: lighter;
}

.btn-save:active {
   box-shadow: 5px 5px 5px rgb(118, 113, 113);
   transform: translateY(5px);
}

.btn-new:active {
   box-shadow: 5px 5px 5px rgb(118, 113, 113);
   transform: translateY(5px);
}

.btn-home:active {
   text-shadow: 2px 2px 2px rgb(47, 51, 63);
   transform: translateY(3px);
}

.btn-logout:active {
   text-shadow: 2px 2px 2px rgb(47, 51, 63);
   transform: translateY(3px);
}

.btn-save {
   color: white;
   background-color: rgb(7, 79, 102);
   border-radius: 8px;
   border: none;
   color: #FFFFFF;
   text-align: center;
   width: 150px;
   font-size: 18pt;
   font-family: mbcL;
   padding: 3px;
   margin-top: 10px;
}

.btn-new {
   color: white;
   background-color: rgb(250, 217, 86);
   border-radius: 8px;
   border: none;
   color: #FFFFFF;
   text-align: center;
   width: 150px;
   font-size: 18pt;
   font-family: mbcL;
   padding: 3px;
   margin-top: 10px;
}

.fix-savebutton {
   position: fixed;
   top: 100px;
   right: 330px;
   z-index: 1;
}

.fix-refreshbutton {
   position: fixed;
   top: 100px;
   right: 500px;
   z-index: 1;
}

/*---------------주관식----------------*/
.filebox2 input[type="file"] {
   position: absolute;
   width: 1px;
   height: 1px;
   padding: 0;
   margin: -1px;
   overflow: hidden;
   clip: rect(0, 0, 0, 0);
   border: 0;
}

.filebox2 label {
   font-size: 15pt;
   font-family: mbcL;
   color: white;
   text-align: center;
   border-radius: 8px;
   border: none;
   width: 150px;
   padding: 5px;
   background: rgb(49, 207, 255);
   font-weight: lighter;
}
/* named upload */
.filebox2 .upload-name2 {
   width: 310px;
   display: inline-block;
   padding: 5px; /* label의 패딩값과 일치 */
   font-size: inherit;
   font-family: inherit;
   line-height: normal;
   vertical-align: middle;
   background-color: #f5f5f5;
   border: 1px solid #ebebeb;
   border-bottom-color: #e2e2e2;
   border-radius: .25em;
   -webkit-appearance: none; /* 네이티브 외형 감추기 */
   -moz-appearance: none;
   appearance: none;
}

.sLeftC {
   margin-right: 10px;
   margin-bottom: 5px;
   margin-top: 15px;
   height: 490px;
   width: 470px;
   padding: 30px;
   font-size: 13pt;
}

.srightC {
   height: 580px;
   margin-top: 15px;
}

.jdInsert { /*주관식 답 입력*/
   font-size: 15pt;
   width: 310px;
}

/* 전체 적용 코드 */
/*초기화 코드*/
* {
   margin: 0;
   padding: 0;
}

:focus {
   outline: none !important
}

li {
   list-style: none;
}

a {
   text-decoration: 0;
}

img {
   border: 0;
}

/*스타일 적용*/
#main_header {
   width: 1000px;
   margin: 0 auto;
   margin-bottom: 50px;
   height: 60px;
   position: relative;
   top: 15px;
}

#main_section {
   width: 1000px;
   margin: 20px auto;
   position: relative;
}

#main_footer {
   width: 1000px;
   margin: 0 auto;
   position: relative;
   bottom: 10px;
}

.btn-home {
   color: rgb(246, 129, 112);
   background-color: transparent;
   font-size: 21pt;
   border: none;
   cursor: pointer;
   font-family: typoSMB;
   position: absolute;
   left: 30px;
}

.btn-logout {
   border: none;
   color: rgb(7, 79, 102);
   background-color: transparent;
   font-size: 15pt;
   cursor: pointer;
   font-family: typoSMB;
   color: rgb(7, 79, 102);
   position: absolute;
   right: 30px;
   top: 5px;
}

.text-page {
   font-family: typoSMB;
   background-color: transparent;
   font-size: 35pt;
   color: black;
   margin-left: 90px;
}

@font-face {
   font-family: typoSMB;
   src: url(typoSMB.eot); /* IE 호환성 보기 */
   src:
      url('${pageContext.request.contextPath}/resources/font/typoSMB.eot')
      format('embedded-opentype'), /* IE 6 ~ 8 */                      
       
       
       
       
      url('${pageContext.request.contextPath}/resources/font/typoSMB.woff')
      format('woff'), /* 모던 브라우저 */    
       
       
       
       url('${pageContext.request.contextPath}/resources/font/typoSMB.ttf')
      format('truetype');
}

@font-face {
   font-family: mbcL;
   src: url(mbcL.eot); /* IE 호환성 보기 */
   src: url('${pageContext.request.contextPath}/resources/font/mbcL.eot')
      format('embedded-opentype'), /* IE 6 ~ 8 */    
       
       
       
       url('${pageContext.request.contextPath}/resources/font/mbcL.woff')
      format('woff'), /* 모던 브라우저 */
      url('${pageContext.request.contextPath}/resources/font/mbcL.ttf')
      format('truetype');
}
</style>

<script type="text/javascript">
   $(document).ready(
         function() {
            var fileTarget = $('.filebox .upload-hidden');
            fileTarget.on('change', function() {
               // 값이 변경되면 
               if (window.FileReader) { // modern browser 
                  var filename = $(this)[0].files[0].name;
               } else { // old IE 
                  var filename = $(this).val().split('/').pop().split(
                        '\\').pop(); // 파일명만 추출 
               } // 추출한 파일명 삽입 
               $(this).siblings('.upload-name').val(filename);
            });
         });
   $(document).ready(
         function() {
            var fileTarget = $('.filebox2 .upload-hidden2');
            fileTarget.on('change', function() {
               // 값이 변경되면 
               if (window.FileReader) { // modern browser 
                  var filename = $(this)[0].files[0].name;
               } else { // old IE 
                  var filename = $(this).val().split('/').pop().split(
                        '\\').pop(); // 파일명만 추출 
               } // 추출한 파일명 삽입 
               $(this).siblings('.upload-name2').val(filename);
            });
         });
</script>