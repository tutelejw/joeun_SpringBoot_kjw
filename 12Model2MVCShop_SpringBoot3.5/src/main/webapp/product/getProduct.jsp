<%@ page contentType="text/html; charset=UTF-8" %>
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
<html>
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
        body { padding-top: 50px; }
        .product-image { max-width: 320px; max-height: 320px; }
    </style>
    <title>상품정보조회</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script type="text/javascript">
        $(function () {
            // 구매 버튼
            $("#ct_btn01_Purchase").on("click", function () {
                location.href = "/purchase/addPurchaseView?prodNo=${product.prodNo}";
            });
            // 확인 버튼
            $("#ct_btn01_Confirm").on("click", function () {
                history.back();
            });
        });
    </script>
</head>
<body>
    <!-- ToolBar Start /////////////////////////////////////-->
    <jsp:include page="/layout/toolbar.jsp" />
    <!-- ToolBar End /////////////////////////////////////-->
    <!-- 화면구성 div Start /////////////////////////////////////-->
    <table width="100%" height="37" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td width="15" height="37"><img src="/images/ct_ttl_img01.gif" width="15" height="37"></td>
            <td background="/images/ct_ttl_img02.gif" width="100%" style="padding-left:10px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="93%" class="ct_ttl01">상품정보조회</td>
                        <td width="20%" align="right">&nbsp;</td>
                    </tr>
                </table>
            </td>
            <td width="12" height="37">
                <img src="/images/ct_ttl_img03.gif" width="12" height="37"/>
            </td>
        </tr>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:13px;">
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
        <tr>
            <td width="104" class="ct_write">상품번호 <img src="/images/ct_icon_red.gif" width="3" height="3" align="absmiddle"/></td>
            <td bgcolor="D6D6D6" width="1"></td>
            <td class="ct_write01">${product.prodNo}</td>
        </tr>
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
        <tr>
            <td width="104" class="ct_write">상품명 <img src="/images/ct_icon_red.gif" width="3" height="3" align="absmiddle"/></td>
            <td bgcolor="D6D6D6" width="1"></td>
            <td class="ct_write01">${product.prodName}</td>
        </tr>
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
        <tr>
            <td width="104" class="ct_write">상품 이미지</td>
            <td bgcolor="D6D6D6" width="1"></td>
            <td class="ct_write01">
                <c:choose>
                    <c:when test="${not empty product.fileName}">
                        <img src="/images/${product.fileName}" class="product-image" alt="상품 이미지"/>
                        <br>
                        <small>${product.fileName}</small>
                    </c:when>
                    <c:otherwise>
                        <span>이미지 없음</span>
                    </c:otherwise>
                </c:choose>
            </td>
        </tr>
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
        <tr>
            <td width="104" class="ct_write">상품 상세정보</td>
            <td bgcolor="D6D6D6" width="1"></td>
            <td class="ct_write01">${product.prodDetail}</td>
        </tr>
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
        <tr>
            <td width="104" class="ct_write">제조일자</td>
            <td bgcolor="D6D6D6" width="1"></td>
            <td class="ct_write01">${product.manuDate}</td>
        </tr>
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
        <tr>
            <td width="104" class="ct_write">가격</td>
            <td bgcolor="D6D6D6" width="1"></td>
            <td class="ct_write01">${product.price}</td>
        </tr>
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
        <tr>
            <td width="104" class="ct_write">등록일자</td>
            <td bgcolor="D6D6D6" width="1"></td>
            <td class="ct_write01">${product.regDate}</td>
        </tr>
        <tr><td height="1" colspan="3" bgcolor="D6D6D6"></td></tr>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
        <tr>
            <td width="53%"></td>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="17" height="23"><img src="/images/ct_btnbg01.gif" width="17" height="23"></td>
                        <td id="ct_btn01_Purchase" background="/images/ct_btnbg02.gif" class="ct_btn01" style="padding-top:3px;">
                            구매
                        </td>
                        <td width="14" height="23"><img src="/images/ct_btnbg03.gif" width="14" height="23"></td>
                        <td width="30"></td>
                        <td width="17" height="23"><img src="/images/ct_btnbg01.gif" width="17" height="23"></td>
                        <td id="ct_btn01_Confirm" background="/images/ct_btnbg02.gif" class="ct_btn01" style="padding-top:3px;">
                            확인
                        </td>
                        <td width="14" height="23"><img src="/images/ct_btnbg03.gif" width="14" height="23"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
