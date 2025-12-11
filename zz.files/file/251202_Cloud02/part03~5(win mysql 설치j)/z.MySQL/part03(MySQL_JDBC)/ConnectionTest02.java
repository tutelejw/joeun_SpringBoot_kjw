import java.sql.*;  
//import java.util.*;

//==> 아래의 import 주석 처리한 이유 의 이해
//import oracle.jdbc.driver.*;

/*
*	FileName : ConnectionTest02.java
*
*	1. JDBC Programming  절차 이해
 *   ==>DBMS 접근(login과정)			: Connection 객체로 Object Modeling
 *   ==>SQL Prompt  & SQL전송		: Statement  객체로 Object Modeling
 *   ==>SQL문의 결과						: ResultSet 객체로 Object Modeling
*/
public class ConnectionTest02{

    ///Main Method   
	public static void main(String[] args) throws Exception{

		//DB에 로그인 접속정보
		//==> OK
		String url = "jdbc:mysql://52.79.49.156:3306/test_db";
		//==> NO GOOD
		//String url = "jdbc:mysql://192.168.219.107:3306/test_db";

		//String user ="root";
		//String pwd = "root";
		String user ="scott";
		String pwd = "tiger";


/*  ==== DBMS 종속적인 아래의 부분을 주석 이유 이해 ======
		//1.단계  connection :: login 과정
		//1.1 OracleDriver  instance 생성
		OracleDriver od = new OracleDriver();

		//1.2 oracle에 접속 정보를 갖는  properties instance 생성 
		Properties info = new Properties();
		info.put("user",user);
		info.put("password",pwd);

		//1.3OracleDriver intance를 사용  Connection instance 생성
		Connection con = od.connect(url,info);
 ==================================================*/

		// Interface 기반 Programmin : java.sql.* 이용 DBMS 비종속적인 DB
		//1.단계  connection :: login 과정
		//==> Deplecated Message
		//Class.forName("com.mysql.jdbc.Driver");
		//==> 변경 추천함.
		Class.forName("com.mysql.cj.jdbc.Driver");

		Connection con = DriverManager.getConnection(url,user,pwd);

		//2단계 QUERY (SELECT * FROM product) 전송단계 
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT * FROM product"); 

		//3단계 결과 확인
		while( rs.next() ){   

			String productName = rs.getString("p_name");
			int productPrice = rs.getInt("p_price");

			System.out.println("상품명 : "+productName);
			System.out.println("가   격 : "+productPrice);
		}

		//각각의 객체를 close한다.
		rs.close();
		stmt.close();
		con.close();

	}//end of main

}//end of class