package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.model.ProductImages;
import com.IEFinalProject.Backend.repository.ProductImagesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class UploadDownloadImageService {

    @Autowired
    private ProductImagesRepo productImagesRepo;

    private final String FOLDER_PATH = "C:\\Users\\shane\\repos\\CSIT-340-Final-Project\\back-end\\Backend\\Backend\\src\\main\\resources\\static\\";

    public String uploadImageToFileSystem(MultipartFile file) throws IOException{
        String filePath = FOLDER_PATH+file.getOriginalFilename();
        ProductImages fileData = productImagesRepo.save(ProductImages.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .filePath(filePath)
                .build()
        );

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "file uploaded successfully: " + filePath;
        }

        return null;
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<ProductImages> fileData = productImagesRepo.findByFileName(fileName);
        String filePath = fileData.get().getFilePath();

        byte[] images = Files.readAllBytes(new File(filePath).toPath());

        return images;
    }
}
