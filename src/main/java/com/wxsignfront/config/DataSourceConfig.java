package com.wxsignfront.config;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * 数据库配置
 * Created by QuiteWing_YJ on 2016/12/13.
 */
@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource(){

        BasicDataSource ds = new BasicDataSource();
        //正式数据库
        /*ds.setUrl("jdbc:mysql://tantan20170323.mysql.rds.aliyuncs.com:3306/tantanwebsite");
        ds.setUsername("ttwz");
        ds.setPassword("UVeSr6#qKy6uB5wV9o");*/
        //测试数据库
        ds.setUrl("jdbc:mysql://120.26.192.139:3306/wxsign");
        ds.setUsername("root");
        ds.setPassword("sogoodtea");
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setTestWhileIdle(true);
        ds.setValidationQuery("SELECT 1");
        ds.setTimeBetweenEvictionRunsMillis(3600000);
        return ds;

    }

}
