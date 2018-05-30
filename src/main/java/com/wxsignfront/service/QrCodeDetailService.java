package com.wxsignfront.service;



import com.wxsignfront.entity.QrCode;
import com.wxsignfront.entity.QrCodeDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
public interface QrCodeDetailService {

    List<QrCodeDetail> findQrCodeDetailListByQrcodeid(Long qrcodeid);

    Page<QrCodeDetail> queryQrCodeDetailList(String phone,String year,Integer swiptime, Pageable ps);

    QrCodeDetail saveQrCodeDetail(QrCodeDetail qc);

    QrCodeDetail findQrCodeDetailByCodenum(String codeNum);
}
