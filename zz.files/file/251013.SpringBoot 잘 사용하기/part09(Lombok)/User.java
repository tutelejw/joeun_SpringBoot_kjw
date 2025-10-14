package spring.web.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder   //==> 빌더패턴 으로 생성 ???
public class User {
	///Field
	private String id;
	private String pwd;
	private int age;
	
	///Constructor
	
	///Method

}
