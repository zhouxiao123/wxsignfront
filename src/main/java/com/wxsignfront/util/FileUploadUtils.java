package com.wxsignfront.util;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

/**
 * Created by Administrator on 2017/3/3.
 * 文件处理
 */
public class FileUploadUtils {

    //临时存放路径
    static final public String tempPath = "/home/wxsign/temp/";

    //正式存放路径
    static final public String realPath = "/home/wxsign/images/";

    /**
     * 上传文件到临时目录
     * @param mFile
     * @return
     */
    static public String uploadImg(MultipartFile mFile){
       // MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        // 得到上传的文件
        //MultipartFile mFile = multipartRequest.getFile("file");
        // 得到上传的文件的文件名
        String filename = mFile.getOriginalFilename();
        InputStream inputStream = null;
        FileOutputStream outputStream = null;
        //获取文件后缀名
        String suffixName = filename.substring(filename.lastIndexOf("."));
        //文件上传后的名字
        String uploadFileName = UUID.randomUUID()+suffixName;
        // 得到上传服务器的路径
        String path = tempPath;
        File f = new File(path);
        if(!f.exists())
            f.mkdirs();
        path = path + uploadFileName;
        try {
            inputStream = mFile.getInputStream();
            outputStream = new FileOutputStream(path);
            int byteCount = 0;
            byte[] bytes = new byte[1024];
            while ((byteCount = inputStream.read(bytes)) != -1){
                outputStream.write(bytes, 0, byteCount);
            }
            // 文件流写到服务器端

            if(inputStream != null)
                inputStream.close();
            if(outputStream != null)
                outputStream.close();
            return uploadFileName;
        } catch (IOException e){
            e.printStackTrace();
            return "";
        }

    }

    /**
     * 移动文件到正式目录
     * @param tempName
     * @return
     */
    static public String moveFileToDir(String tempName){
        String path = realPath;
        File f = new File(path);
        if(!f.exists())
            f.mkdirs();
        String tempFilePath = tempPath + tempName;
        String realFilePath = path + tempName;
        try {
            FileCopyUtils.copy(new File(tempFilePath), new File(realFilePath));
            File tempFile = new File(tempFilePath);
            tempFile.delete();
            return tempName;
        } catch (IOException e){
            e.printStackTrace();
            return "";
        }
    }

}
