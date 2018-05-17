package com.wxsignfront.service;


import com.wxsignfront.dao.QrCodeDetailDao;
import com.wxsignfront.entity.QrCodeDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
@Service
public class QrCodeDetailServiceImpl implements QrCodeDetailService{

    @Autowired
    private QrCodeDetailDao qrCodeDetailDao;


    @Override
    public List<QrCodeDetail> findQrCodeDetailListByQrcodeid(Long qrcodeid) {
        return qrCodeDetailDao.findByQrcodeidOrderBySwipeTimeAscIdDesc(qrcodeid);
    }

    @Override
    public QrCodeDetail saveQrCodeDetail(QrCodeDetail qc) {
        return qrCodeDetailDao.save(qc);
    }

    @Override
    public QrCodeDetail findQrCodeDetailByCodenum(String codeNum) {
        return qrCodeDetailDao.getByCodenum(codeNum);
    }
}
