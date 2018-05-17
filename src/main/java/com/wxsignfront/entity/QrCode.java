package com.wxsignfront.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Administrator on 2017/6/7.
 */
@Entity
@Table(name="qrcode")
public class QrCode {

    //主键
    @Id
    @GeneratedValue
    private Long id;

    //openid
    @Column(name="openid")
    private String openId;

    //codeurl
    @Column(name="codeurl")
    private String codeUrl;

    //订单号
    @Column(name="ordernumber")
    private String orderNumber;

    //支付成功订单号
    @Column(name="paynumber")
    private String payNumber;

    //支付价格
    @Column(name="payprice")
    private Float payPrice;

    //支付状态
    @Column(name="status")
    private Integer status;

    //创建时间
    @Column(name="createtime")
    private Date createTime;

    //姓名
    @Column(name="name")
    private String name;

    //电话
    @Column(name="phone")
    private String phone;

    //时间
    @Column(name="year")
    private String year;


    //刷卡时间
    @Column(name="swipetime")
    private Date swipeTime;

    //支付方式1公众号，2微信扫码，3支付宝扫码，4其它
    @Column(name="paytype")
    private Integer payType;

    //会议方式1高招，2中招
    @Column(name="meettype")
    private Integer meetType;

    //买票张数
    @Column(name="countnum")
    private Integer countnum;




    public Integer getCountnum() {
        return countnum;
    }

    public void setCountnum(Integer countnum) {
        this.countnum = countnum;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }

    public Integer getMeetType() {
        return meetType;
    }

    public void setMeetType(Integer meetType) {
        this.meetType = meetType;
    }

    public Date getSwipeTime() {
        return swipeTime;
    }

    public void setSwipeTime(Date swipeTime) {
        this.swipeTime = swipeTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getPayNumber() {
        return payNumber;
    }

    public void setPayNumber(String payNumber) {
        this.payNumber = payNumber;
    }

    public Float getPayPrice() {
        return payPrice;
    }

    public void setPayPrice(Float payPrice) {
        this.payPrice = payPrice;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getCodeUrl() {
        return codeUrl;
    }

    public void setCodeUrl(String codeUrl) {
        this.codeUrl = codeUrl;
    }
}
