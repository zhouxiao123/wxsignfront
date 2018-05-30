package com.wxsignfront.service;


import com.wxsignfront.dao.QrCodeDetailDao;
import com.wxsignfront.entity.QrCodeDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<QrCodeDetail> queryQrCodeDetailList(String phone,String year,Integer swip, Pageable ps) {
        if(swip!=null && swip.intValue()==1)
            return qrCodeDetailDao.findQrCodeDetailByPhoneandYearAndSwipTimeIsNotNullOrderByCreatetimeDesc(phone,year,ps);
        else if(swip!=null && swip.intValue()==2)
            return qrCodeDetailDao.findQrCodeDetailByPhoneandYearAndSwipTimeIsNullOrderByCreatetimeDesc(phone,year,ps);
        else
            return qrCodeDetailDao.findQrCodeDetailByPhoneandYearAndSwipTimeOrderByCreatetimeDesc(phone,year,ps);
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
