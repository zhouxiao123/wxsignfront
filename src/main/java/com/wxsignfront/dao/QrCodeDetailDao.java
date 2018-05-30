package com.wxsignfront.dao;


import com.wxsignfront.entity.QrCodeDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
public interface QrCodeDetailDao extends JpaRepository<QrCodeDetail,Long> {

    List<QrCodeDetail> findByQrcodeidOrderBySwipeTimeAscIdDesc(Long qrcodeid);

    QrCodeDetail getByCodenum(String codeNum);

    @Query(value = "select q.* from qrcodedetail q left join qrcode c on c.id=q.qrcodeid where c.phone like %?1% and c.year like %?2% and  q.price > 10 order by q.createtime desc /*#pageable*/",countQuery = "select count(1) from qrcodedetail q left join qrcode c on c.id=q.qrcodeid where c.phone like %?1% and c.year like %?2% and  q.price > 10",nativeQuery = true)
    Page<QrCodeDetail> findQrCodeDetailByPhoneandYearAndSwipTimeOrderByCreatetimeDesc(String phone,String year, Pageable p);

    @Query(value = "select q.* from qrcodedetail q left join qrcode c on c.id=q.qrcodeid where c.phone like %?1% and c.year like %?2% and  q.price > 10 and q.swipetime is not null order by q.createtime desc /*#pageable*/",countQuery = "select count(1) from qrcodedetail q left join qrcode c on c.id=q.qrcodeid where c.phone like %?1% and c.year like %?2% and  q.price > 10  and q.swipetime is not null",nativeQuery = true)
    Page<QrCodeDetail> findQrCodeDetailByPhoneandYearAndSwipTimeIsNotNullOrderByCreatetimeDesc(String phone,String year, Pageable p);

    @Query(value = "select q.* from qrcodedetail q left join qrcode c on c.id=q.qrcodeid where c.phone like %?1% and c.year like %?2% and  q.price > 10  and q.swipetime is null order by q.createtime desc /*#pageable*/",countQuery = "select count(1) from qrcodedetail q left join qrcode c on c.id=q.qrcodeid where c.phone like %?1% and c.year like %?2% and  q.price > 10  and q.swipetime is null",nativeQuery = true)
    Page<QrCodeDetail> findQrCodeDetailByPhoneandYearAndSwipTimeIsNullOrderByCreatetimeDesc(String phone,String year, Pageable p);
}
