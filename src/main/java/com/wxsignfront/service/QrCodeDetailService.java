package com.wxsignfront.service;



import com.wxsignfront.entity.QrCodeDetail;

import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
public interface QrCodeDetailService {

    List<QrCodeDetail> findQrCodeDetailListByQrcodeid(Long qrcodeid);

    QrCodeDetail saveQrCodeDetail(QrCodeDetail qc);

    QrCodeDetail findQrCodeDetailByCodenum(String codeNum);
}
