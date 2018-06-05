package com.wxsignfront.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Administrator on 2017/6/7.
 */
@Entity
@Table(name="qrcodedetail")
public class QrCodeDetail {

    //主键
    @Id
    @GeneratedValue
    private Long id;

    private Long qrcodeid;


    private String codenum;


    private Float price;


    //创建时间
    @Column(name="createtime")
    private Date createTime;

    //刷卡时间
    @Column(name="swipetime")
    private Date swipeTime;

    private Integer swipetype;

    @OneToOne
    @JoinColumn(name = "qrcodeid",referencedColumnName="id",insertable = false,updatable = false)
    private QrCode qc;

    public Integer getSwipetype() {
        return swipetype;
    }

    public void setSwipetype(Integer swipetype) {
        this.swipetype = swipetype;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQrcodeid() {
        return qrcodeid;
    }

    public void setQrcodeid(Long qrcodeid) {
        this.qrcodeid = qrcodeid;
    }

    public String getCodenum() {
        return codenum;
    }

    public void setCodenum(String codenum) {
        this.codenum = codenum;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getSwipeTime() {
        return swipeTime;
    }

    public void setSwipeTime(Date swipeTime) {
        this.swipeTime = swipeTime;
    }

    public QrCode getQc() {
        return qc;
    }

    public void setQc(QrCode qc) {
        this.qc = qc;
    }
}
