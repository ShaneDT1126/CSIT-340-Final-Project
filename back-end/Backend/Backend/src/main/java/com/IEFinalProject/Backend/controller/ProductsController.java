package com.IEFinalProject.Backend.controller;

import com.IEFinalProject.Backend.dto.ProductReqRes;
import com.IEFinalProject.Backend.service.ProductService;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ProductsController {
    @Autowired
    private ProductService productService;


    @PostMapping("/auth/addProduct")
    public ResponseEntity<ProductReqRes> addNewProduct(
            @RequestPart("productDetails")  ProductReqRes product,
            @RequestPart("imageFile") MultipartFile productImage)
    {
       return ResponseEntity.ok(productService.addProduct(product,productImage));
    }

    @GetMapping("/public/getAllProducts")
    public ResponseEntity<ProductReqRes> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @DeleteMapping("/auth/delete/{productId}")
    public ResponseEntity<ProductReqRes> deleteProduct(@PathVariable Integer productId){
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    @GetMapping("/public/getProductDetails/{productId}")
    public ResponseEntity<ProductReqRes> getProductDetails(@PathVariable Integer productId){
        return ResponseEntity.ok(productService.getProductDetails(productId));
    }

    @GetMapping("/public/getProductByCategory/{category}")
    public ResponseEntity<ProductReqRes> getProductByCategory(@PathVariable String category){
        return ResponseEntity.ok(productService.getProductByCategory(category));
    }

    @PutMapping("/auth/updateProduct/{productId}")
    public ResponseEntity<ProductReqRes> updateProduct(@PathVariable Integer productId, @RequestBody ProductReqRes product){
        return ResponseEntity.ok(productService.updateProduct(product,productId));
    }

    @GetMapping("/auth/getProductImage/{productId}")
    public ResponseEntity<?> getProductImage(@PathVariable Integer productId)throws IOException {
        byte[] productImage = productService.getProductPicture(productId);

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(productImage);
    }


}
