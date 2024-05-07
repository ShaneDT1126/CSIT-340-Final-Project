package com.IEFinalProject.Backend.contoller;

import com.IEFinalProject.Backend.dto.ProductReqRes;
import com.IEFinalProject.Backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ProductsController {
    @Autowired
    private ProductService productService;


    @PostMapping("/public/addProduct")
    public ResponseEntity<ProductReqRes> addNewProduct(@RequestBody ProductReqRes product){
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @GetMapping("/public/getAllProducts")
    public ResponseEntity<ProductReqRes> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @DeleteMapping("/public/delete/{productId}")
    public ResponseEntity<ProductReqRes> deleteProduct(Integer productId){
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }
}
