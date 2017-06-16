package com.wxsignfront.service;



import com.wxsignfront.entity.QrCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
public interface QrCodeService {

    List<QrCode> findQrCodeListByOpenId(String openId);

    Page<QrCode> queryQrCodeList(QrCode qr, Pageable ps);

    QrCode saveQrCode(QrCode qc);

    QrCode findQrCodeByOrderNumber(String orderNumber);
}
