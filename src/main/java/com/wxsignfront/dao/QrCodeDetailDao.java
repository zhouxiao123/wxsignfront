package com.wxsignfront.dao;


import com.wxsignfront.entity.QrCodeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
public interface QrCodeDetailDao extends JpaRepository<QrCodeDetail,Long> {

    List<QrCodeDetail> findByQrcodeidOrderBySwipeTimeAscIdDesc(Long qrcodeid);

    QrCodeDetail getByCodenum(String codeNum);
}
