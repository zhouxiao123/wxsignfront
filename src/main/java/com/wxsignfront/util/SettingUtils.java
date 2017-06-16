package com.wxsignfront.util;

import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * 加载配置文件，并提供读取的方法
 */
public class SettingUtils {
	public static String FILE_COMMON = "/common.properties";
	private static Map<String, Properties> pools = new HashMap<String, Properties>();

	/**
	 * 加载系统级的配置文件
	 * 
	 * @param uri
	 * @return
	 */
	public static Properties loadSetting(String uri) {
		Properties prop = pools.get(uri);
		if (prop == null) {
			// 没有加载则加载
			InputStream is = SettingUtils.class.getResourceAsStream(uri);
			if (is == null) {
				throw new IllegalArgumentException("Resource [" + uri + "] not found");
			}
			prop = new Properties();
			try {
				prop.load(is);
			} catch (IOException e) {
				throw new IllegalArgumentException(e);
			}
			pools.put(uri, prop);
		}
		return prop;
	}

	/**
	 * 读取common.properties文件中的值
	 * 
	 * @param key
	 * @return
	 */
	public static String getCommonSetting(String key) {
		Properties prop = loadSetting(FILE_COMMON);
		return prop.getProperty(key);
	}

	public static String convertStringMd5(String str) {
		byte[] defaultBytes = str.getBytes();
		try {
			MessageDigest algorithm = MessageDigest.getInstance("MD5");
			algorithm.reset();
			algorithm.update(defaultBytes);
			byte messageDigest[] = algorithm.digest();
			StringBuffer hexString = new StringBuffer();
			for (int i = 0; i < messageDigest.length; i++) {
				String hex = Integer.toHexString(0xFF & messageDigest[i]);
				if (hex.length() == 1)
					hexString.append('0');
				hexString.append(hex);
			}
			return hexString.toString();
		} catch (NoSuchAlgorithmException nsae) {
			return str;
		}
	}

}
