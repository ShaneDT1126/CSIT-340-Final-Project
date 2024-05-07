package com.IEFinalProject.Backend.contoller;

import com.IEFinalProject.Backend.model.ProductImages;
import com.IEFinalProject.Backend.service.UploadDownloadImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ImageUploadDownloadController {

    @Autowired
    private UploadDownloadImageService uploadDownloadImageService;


    @PostMapping("/public/uploadImage")
    public ResponseEntity<?> uploadImageToFileSystem(@RequestParam("image")MultipartFile file) throws IOException{
        String uploadImage = uploadDownloadImageService.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }

    @GetMapping("/public/downloadImage/{fileName}")
    public ResponseEntity<?> downloadToFileSystem(@PathVariable String fileName) throws IOException{
        byte[] imageData = uploadDownloadImageService.downloadImageFromFileSystem(fileName);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);
    }


}
