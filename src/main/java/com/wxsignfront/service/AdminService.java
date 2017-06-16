package com.wxsignfront.service;





import com.wxsignfront.entity.AdminUser;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * 管理员管理服务类接口
 * Created by QuiteWing_YJ on 2016/12/13.
 */
 public interface AdminService {

 /**
  * 根据loginusername获取用户信息
  * @param loginName
  * @return
  */
 @Transactional(isolation= Isolation.READ_COMMITTED,propagation = Propagation.REQUIRED)
 AdminUser findByLoginName(String loginName);

 /**
  * 根据openId获取用户信息
  * @param openId
  * @return
  */
 @Transactional(isolation= Isolation.READ_COMMITTED,propagation = Propagation.REQUIRED)
 AdminUser findByOpenId(String openId);



 /**
  * 保存或更新用户信息
  * @param
  * @return
  */
 @Transactional(isolation= Isolation.READ_COMMITTED,propagation = Propagation.REQUIRED)
 AdminUser saveAdminUser(AdminUser au);


}
