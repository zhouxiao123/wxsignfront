package com.wxsignfront.Controller;



import com.wxsignfront.entity.QrCode;
import com.wxsignfront.entity.QrCodeDetail;
import com.wxsignfront.service.QrCodeDetailService;
import com.wxsignfront.service.QrCodeService;
import com.wxsignfront.util.MyPageSupport;
import com.wxsignfront.util.QRCodeUtil;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.util.*;


/**
 * 基本控制器，控制后台页面跳转
 * Created by Administrator on 2016/12/21.
 */
@Controller
public class BasicController {

    @Value("${base.url}")
    private String baseUrl;

    @Autowired
    private QrCodeService qrCodeService;

    @Autowired
    private QrCodeDetailService qrCodeDetailService;

    /**
     * 登跳转到首页面
     *
     * @return 跳转到页面
     */
    @RequestMapping("/index")
    public String index() {



        return "index";
    }


    /**
     * 扫码时间更新
     *
     * @return
     */
    @RequestMapping("/qr_check")
    public @ResponseBody
    Map<String, Object> qrCheck(HttpServletRequest request, Model model, @RequestParam String orderNumber) {
        Map<String, Object> map = new HashMap<>();
        //QrCode qc = qrCodeService.findQrCodeByOrderNumber(orderNumber);
        QrCodeDetail qcd = qrCodeDetailService.findQrCodeDetailByCodenum(orderNumber);
        if(qcd == null)
            map.put("result", -1);
        else if(qcd.getSwipeTime() != null) {
            map.put("result", 0);
            map.put("qcd", qcd);
        }
        else
        {
            qcd.setSwipeTime(new Date());
            //qrCodeService.saveQrCode(qc);
            qrCodeDetailService.saveQrCodeDetail(qcd);
            map.put("result", 1);
            map.put("qcd", qcd);
        }
        return map;
    }


    /**
     * 生成二维码
     * @return
     */
    @RequestMapping( value = "/qrcode",method = RequestMethod.GET)
    public void qrcode(HttpServletResponse response, @RequestParam String code_url){
        try {
            QRCodeUtil.encode(code_url,response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    /**
     * 登跳转到首页面
     *
     * @return 跳转到页面
     */
    @RequestMapping("/showQrCodeList")
    public String showQrCodeList(Model model,HttpServletRequest request,@RequestParam(required = false) String phone,@RequestParam(required = false) String year,@RequestParam(required = false) Integer swipe,@RequestParam(required = false) Integer meetType) {
        Pageable p = MyPageSupport.initPageSupport(request, Sort.Direction.DESC,"id");
        QrCode q = new QrCode();
        q.setStatus(1);
        //大于10的，防止查出0.01元的
        q.setPayPrice(10f);
        if(meetType!=null && meetType.intValue() > 0) {
            q.setMeetType(meetType);
            model.addAttribute("meetType",meetType);
        }
        if(swipe!=null && swipe.intValue() > 0) {
            q.setCodeUrl(swipe.toString());
            model.addAttribute("swipe",swipe);
        }
        if(!StringUtils.isEmpty(phone)) {
            q.setPhone(phone);
            model.addAttribute("phone",phone);
        }
        q.setYear("2018");
        if(!StringUtils.isEmpty(year)) {
            q.setYear(year);
            model.addAttribute("year",year);
        }
        Page result = qrCodeService.queryQrCodeList(q,p);
        model.addAttribute("codeList",result.getContent());
        MyPageSupport.setPageSupport(model,result);


        return "back/showList";
    }



}
