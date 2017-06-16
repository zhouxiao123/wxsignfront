package com.wxsignfront.service;




import com.wxsignfront.dao.AdminDao;
import com.wxsignfront.entity.AdminUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 管理员服务类接口实现类
 * Created by QuiteWing_YJ on 2016/12/13.
 */
@Service
public class AdminServiceImpl implements  AdminService {

    @Autowired
    private AdminDao adminDao;

    @Override
    public AdminUser findByLoginName(String loginName){
        return adminDao.findByLoginName(loginName);
    }

    @Override
    public AdminUser findByOpenId(String openId) {
        return adminDao.findByOpenId(openId);
    }

    @Override
    public AdminUser saveAdminUser(AdminUser au) {
        return adminDao.save(au);
    }
}
