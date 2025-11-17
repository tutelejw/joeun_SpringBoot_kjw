package com.model2.mvc.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.model2.mvc.common.web.LogonCheckInterceptor;

import java.io.File;

//======================== 추가, 변경된 부분  ==========================/
//==> Spring Boot 시 추가된 부분.  //==> No Meta Data ==> No XML
//======================== 추가, 변경된 부분  ==========================/
@Configuration
public class WebConfig4 implements WebMvcConfigurer {

	@Value("${file.upload-dir}")
	private String uploadDir;

	public WebConfig4() {
		System.out.println("==> WebConfig default Constructor call.............");
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		// URL Pattern 을 확인하고. interceptor 적용유무 등록함.
		registry.addInterceptor( new LogonCheckInterceptor()).addPathPatterns("/user/*");

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/// 이미지 업로드 경로 매핑
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// /images/** 요청을 upload/images 폴더로 매핑
		String absolutePath = new File(uploadDir).getAbsolutePath();

		registry.addResourceHandler("/images/**")
				.addResourceLocations("file:///" + absolutePath + "/");

		System.out.println("[WebConfig] 이미지 경로 매핑: /images/** -> " + absolutePath);
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/// React : 추가된 설정 : CORS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry.addMapping("/**") 			// "/**"는 모든 경로를 의미, web.xml의 <url-pattern>/*</url-pattern>과 동일
				.allowedOriginPatterns("*") 	// 요청을 보내는 출처(Origin)를 모두 허용
				.allowedMethods("GET", "POST", "PUT", "DELETE") 		// 허용할 HTTP 메서드
				.allowedHeaders("*") 														// 허용할 HTTP 헤더
				.allowCredentials(true) 														// 쿠키/인증 정보 포함 요청 허용
				.maxAge(3600); 																	// Pre-flight 요청의 캐시 시간(초)

	}

}