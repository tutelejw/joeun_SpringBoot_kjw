<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.model2.mvc.service.domain.Product" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String uri = request.getRequestURI();
String url = request.getRequestURL().toString();
String query = request.getQueryString();
String method = request.getMethod();

System.out.println("[로그] 요청 URI: " + uri);
System.out.println("[로그] 전체 URL: " + url);
System.out.println("[로그] 쿼리스트링: " + query);
System.out.println("[로그] 요청 방식: " + method);
%>
<%
Product product=(Product)request.getAttribute("product");
%>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" >
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>
<link href="/css/animate.min.css" rel="stylesheet">
<link href="/css/bootstrap-dropdownhover.min.css" rel="stylesheet">
<script src="/javascript/bootstrap-dropdownhover.min.js"></script>
<style>
 body { padding-top : 50px; }
 .preview-img { max-width: 180px; max-height: 180px; border:1px solid #ccc; margin-bottom:8px; }
</style>
<title>상품 정보 수정</title>
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<script type="text/javascript">
$(document).ready(function() {
  // 파일 변경 시 미리보기
  /* $("input[type='file'][name='fileName']").on("change", function(e){ */
  $("input[type='file'][name='uploadFile']").on("change", function(e){
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#imgPreview').attr('src', e.target.result);
    }
    if(this.files[0]) reader.readAsDataURL(this.files[0]);
  });
  // 수정 버튼
  $('#btnUpdate').on('click', function() {
    document.detailForm.action = '/product/updateProduct';
    document.detailForm.submit();
  });
  // 취소 버튼
  $('#btnCancel').on('click', function() {
    history.back();
  });
});
</script>
</head>
<body>
<jsp:include page="/layout/toolbar.jsp" />
<form name="detailForm" method="post" enctype="multipart/form-data">
<input type="hidden" name="prodNo" value="${product.prodNo }">
<table width="100%" height="37" border="0" cellpadding="0"cellspacing="0">
<tr>
<td width="15" height="37">
<img src="/images/ct_ttl_img01.gif" width="15" height="37"/>
</td>
<td background="/images/ct_ttl_img02.gif" width="100%" style="padding-left:10px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td width="93%" class="ct_ttl01">상품정보수정</td>
<td width="20%" align="right">&nbsp;</td>
</tr>
</table>
</td>
<td width="12" height="37">
<img src="/images/ct_ttl_img03.gif" width="12" height="37" />
</td>
</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:13px;">
<tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
<tr>
<td width="104" class="ct_write">상품명 <img src="/images/ct_icon_red.gif" width="3" height="3" align="absmiddle" />
</td>
<td bgcolor="D6D6D6" width="1"></td>
<td class="ct_write01">
<input type="text" name="prodName" value="${product.prodName}" class="ct_input_g"
style="width:100px; height:19px"  maxLength="50" ></td>
</tr>
<tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
<tr>
<td width="104" class="ct_write">상품상세정보 <img src="/images/ct_icon_red.gif" width="3" height="3" align="absmiddle" />
</td>
<td bgcolor="D6D6D6" width="1"></td>
<td class="ct_write01">
<input type="text" name="prodDetail" value="${product.prodDetail}" class="ct_input_g"
style="width:100px; height:19px"  maxLength="50" >
</td>
</tr>
<tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
<tr>
<td width="104" class="ct_write">제조일자</td><td bgcolor="D6D6D6" width="1"></td>
<td class="ct_write01">
<input type="text" name="manuDate" value="${product.manuDate}" class="ct_input_g"
style="width:370px; height:19px"  maxLength="100">
</td>
</tr>
<tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
<tr>
<td width="104" class="ct_write">가격 </td><td bgcolor="D6D6D6" width="1"></td>
<td class="ct_write01">
<input type="text" name="price" value="${product.price}" class="ct_input_g"
style="width:100px; height:19px"   maxLength="100">
</td>
</tr>
<tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
<tr>
<td width="104" class="ct_write">상품이미지 </td><td bgcolor="D6D6D6" width="1"></td>
<td class="ct_write01">
    <c:if test="${not empty product.fileName}">
        <img id="imgPreview" class="preview-img" src="/images/${product.fileName}" alt="상품 미리보기"/>
        <br>
    </c:if>
    <c:if test="${empty product.fileName}">
        <img id="imgPreview" class="preview-img" src="https://via.placeholder.com/180?text=No+Image" alt="미리보기"/>
        <br>
    </c:if>
    <!-- <input type="file" name="fileName" accept="image/*"> -->
    <input type="file" name="uploadFile" accept="image/*">
    <br>
    <small>${product.fileName}</small>
</td>
</tr>
<tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
<tr>
<td width="53%"></td>
<td align="right">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
<td width="17" height="23">
<img src="/images/ct_btnbg01.gif" width="17" height="23" />
</td>
<td background="/images/ct_btnbg02.gif" id="btnUpdate" class="ct_btn01" style="padding-top:3px; cursor:default;">
수정
</td>
<td width="14" height="23"><img src="/images/ct_btnbg03.gif" width="14" height="23" /></td>
<td width="30"></td>
<td width="17" height="23"><img src="/images/ct_btnbg01.gif" width="17" height="23" /></td>
<td background="/images/ct_btnbg02.gif" id="btnCancel" class="ct_btn01" style="padding-top:3px; cursor:default;">
취소
</td>
<td width="14" height="23"><img src="/images/ct_btnbg03.gif" width="14" height="23" /></td>
</tr>
</table>
</td>
</tr>
</table>
</form>
</body>
</html>
