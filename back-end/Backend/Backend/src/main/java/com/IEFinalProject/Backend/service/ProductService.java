package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.ProductReqRes;
import com.IEFinalProject.Backend.model.Category;
import com.IEFinalProject.Backend.model.Product;
import com.IEFinalProject.Backend.model.ProductImages;
import com.IEFinalProject.Backend.repository.CategoryRepo;
import com.IEFinalProject.Backend.repository.ProductRepo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    private final String FOLDER_PATH = "C:\\Users\\shane\\repos\\CSIT-340-Final-Project\\back-end\\Backend\\Backend\\src\\main\\resources\\static\\";

    @Transactional
    public ProductReqRes addProduct(ProductReqRes addProductRequest, MultipartFile imageFile){
        ProductReqRes response = new ProductReqRes();

        try {
            Product product = new Product();
            Category category = categoryRepo.findByName(addProductRequest.getCategory().getName());
            product.setName(addProductRequest.getName());
            product.setDescription(addProductRequest.getDescription());
            product.setPrice(addProductRequest.getPrice());
            product.setCategory(category);

            ProductImages image = new ProductImages();
            image.setFileName(imageFile.getOriginalFilename());
            image.setFileType(imageFile.getContentType());
            image.setFilePath(FOLDER_PATH + imageFile.getOriginalFilename());
            image.setProduct(product);

            product.setProductImages(image);

            Product newProduct = productRepo.save(product);

            imageFile.transferTo(new File(image.getFilePath()));

            if (newProduct.getProductId() >= 0){
                response.setProduct(newProduct);
                response.setMessage("Product Added Successfully");
                response.setStatusCode(200);
            }
        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            response.setStatusCode(500);
            response.setError("Failed to add product: "+e.getMessage());
        }
        return response;
    }

    @Transactional
    public ProductReqRes deleteProduct(Integer productId){
        ProductReqRes response = new ProductReqRes();

        try {
            Optional<Product> product = productRepo.findById(productId);
            if(product.isPresent()){
                productRepo.deleteById(productId);
                response.setStatusCode(200);
                response.setMessage("User Deleted Successfully");
            }else{
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }

        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }

        return response;
    }

    public ProductReqRes getAllProducts(){
        ProductReqRes response = new ProductReqRes();
        try {
            List<Product> products = productRepo.findAll();
            if (!products.isEmpty()){
                response.setAllProducts(products);
                response.setStatusCode(200);
                response.setMessage("Successful");
            } else {
                response.setStatusCode(404);
                response.setMessage("No Users Found");
            }

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }
        return response;
    }


    public ProductReqRes getProductDetails(Integer productId){
        ProductReqRes response = new ProductReqRes();

        try {
            Optional<Product> product = productRepo.findById(productId);
            if (product.isPresent()){
                response.setProduct(product.get());
                response.setStatusCode(200);
                response.setMessage("Success!");
            }
        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }
        return response;
    }

    public ProductReqRes getProductByCategory(String category){
        ProductReqRes response = new ProductReqRes();

        try {
            List<Product> product = productRepo.findByCategoryName(category);
            if (!product.isEmpty()){
                response.setMessage(category+" CATEGORY: ");
                response.setAllProducts(product);
                response.setStatusCode(200);
            }else {
                response.setMessage("No Products Found");
                response.setStatusCode(404);
            }
        } catch (Exception e) {
            response.setError("ERROR OCCURRED: " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Transactional
    public ProductReqRes updateProduct(ProductReqRes productUpdateRequest, Integer productId){
        ProductReqRes response = new ProductReqRes();
        try {
            Optional<Product> product = productRepo.findById(productId);
            Category category = categoryRepo.findByName(productUpdateRequest.getCategory().getName());
            if (product.isPresent()){
                Product newProduct = product.get();
                category.setName(productUpdateRequest.getCategory().getName());
                newProduct.setName(productUpdateRequest.getName());
                newProduct.setDescription(productUpdateRequest.getDescription());
                newProduct.setPrice(productUpdateRequest.getPrice());
                newProduct.setCategory(category);
                productRepo.save(newProduct);
                response.setStatusCode(200);
                response.setProduct(newProduct);
                response.setMessage("Product Update Successfully");
            }else {
                response.setStatusCode(404);
                response.setMessage("Product Not Found");

            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }
        return response;
    }


}
