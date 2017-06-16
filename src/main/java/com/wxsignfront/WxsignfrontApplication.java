package com.wxsignfront;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
public class WxsignfrontApplication {

	public static void main(String[] args) {
		SpringApplication.run(WxsignfrontApplication.class, args);
	}
}
