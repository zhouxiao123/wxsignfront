package com.wxsignfront.dao;


import com.wxsignfront.entity.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
public interface QrCodeDao extends JpaRepository<QrCode,Long>, JpaSpecificationExecutor<QrCode> {

    List<QrCode> findByOpenIdAndStatusOrderByIdDesc(String openId, Integer status);

    QrCode getByOrderNumber(String orderNumber);
}
