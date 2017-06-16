package com.wxsignfront.util;

import java.security.MessageDigest;

/**
 * 对密码进行md5加密
 */
public class MD5 {
    public static String md5(String str) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer("");
            for (byte aB : b) {
                i = aB;
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
            str = buf.toString();
        } catch (Exception e) {
            e.printStackTrace();

        }
        return str;
    }
/*    public static void main(String[] args) {
        String link_url = null;
        try {
            link_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + AccessTokenTool.AppId + "&redirect_uri=" +
                    URLEncoder.encode("http://wxsign.sczk.com.cn/index", "UTF-8") + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        System.out.println(link_url);

    }*/
}