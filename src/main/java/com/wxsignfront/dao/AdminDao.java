package com.wxsignfront.dao;





import com.wxsignfront.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 管理员数据访问接口
 * Created by QuiteWing_YJ on 2016/12/13.
 */
public interface AdminDao extends JpaRepository<AdminUser,Long> {


    /**
     * 根据loginusername获取用户信息
     * @param loginName
     * @return
     */
    AdminUser findByLoginName(String loginName);

    /**
     * 根据openid获取用户信息
     * @param openId
     * @return
     */
    AdminUser findByOpenId(String openId);

}
