package com.wxsignfront.service;


import com.wxsignfront.dao.QrCodeDao;
import com.wxsignfront.entity.QrCode;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/6/7.
 */
@Service
public class QrCodeServiceImpl implements QrCodeService{

    @Autowired
    private QrCodeDao qrCodeDao;

    @Override
    public List<QrCode> findQrCodeListByOpenId(String openId) {
        return qrCodeDao.findByOpenIdAndStatusOrderByIdDesc(openId,1);
    }

    @Override
    public Page<QrCode> queryQrCodeList(QrCode qr, Pageable ps) {
        return qrCodeDao.findAll(Specifications.where(getWhereClause(qr)),ps);
    }

    private Specification<QrCode> getWhereClause(QrCode qr) {
        return new Specification<QrCode>() {
            @Override
            public Predicate toPredicate(Root<QrCode> r, CriteriaQuery<?> q, CriteriaBuilder cb) {
                Predicate predicate = cb.conjunction();
                if (StringUtils.isNotBlank(qr.getPhone())) {
                    predicate.getExpressions().add(
                            cb.like(r.<String>get("phone"), "%" + StringUtils.trim(qr.getPhone()) + "%")
                    );
                }
                if (qr.getPayPrice() !=null && qr.getPayPrice().intValue() >= 0) {
                    predicate.getExpressions().add(
                            cb.gt(r.<Float>get("payPrice"),qr.getPayPrice())
                    );
                }

                if (qr.getStatus() !=null && qr.getStatus().intValue() >= 0) {
                    predicate.getExpressions().add(
                            cb.equal(r.<Integer>get("status"),qr.getStatus())
                    );
                }
                if (qr.getMeetType() !=null && qr.getMeetType().intValue() > 0) {
                    predicate.getExpressions().add(
                            cb.equal(r.<Integer>get("meetType"),qr.getMeetType())
                    );
                }
                if (qr.getCodeUrl() !=null && qr.getCodeUrl().equals("1")) {
                    predicate.getExpressions().add(
                            cb.isNotNull(r.<Date>get("swipeTime"))
                    );
                }
                if (qr.getCodeUrl() !=null && qr.getCodeUrl().equals("2")) {
                    predicate.getExpressions().add(
                            cb.isNull(r.<Date>get("swipeTime"))
                    );
                }

                return predicate;
            }
        };
    }

    @Override
    public QrCode saveQrCode(QrCode qc) {
        return qrCodeDao.save(qc);
    }

    @Override
    public QrCode findQrCodeByOrderNumber(String orderNumber) {
        return qrCodeDao.getByOrderNumber(orderNumber);
    }
}
