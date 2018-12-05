package com.travelfilters.web.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Base64;

@RequestMapping("v1/city_picture")
public class ImageController {
    @GetMapping(value = "/{city_name}", produces = MediaType.IMAGE_JPEG_VALUE)
    public static @ResponseBody
    byte[] getImageWithMediaType(@PathVariable String city_name) throws IOException {
        File image_file = new File(Paths.get(".") + "/DATA/city_pictures/" + city_name + ".jpg");

        byte[] bytes = new byte[(int) image_file.length()];
        DataInputStream dis = new DataInputStream(new FileInputStream(image_file));
        dis.readFully(bytes);
        String s = Base64.getEncoder().encodeToString(bytes);

//        System.out.println(s);
        return bytes;
    }
}
