package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.ProductReqRes;
import com.IEFinalProject.Backend.model.Category;
import com.IEFinalProject.Backend.model.Product;
import com.IEFinalProject.Backend.repository.CategoryRepo;
import com.IEFinalProject.Backend.repository.ProductRepo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRepo categoryRepo;


    @Transactional
    @JsonIgnoreProperties({"category"})
    public ProductReqRes addProduct(ProductReqRes addProductRequest){
        ProductReqRes response = new ProductReqRes();

        try {
            Product product = new Product();
            Category category = categoryRepo.findByName(addProductRequest.getCategory().getName());
            product.setName(addProductRequest.getName());
            product.setDescription(addProductRequest.getDescription());
            product.setPrice(addProductRequest.getPrice());
            product.setCategory(category);
            Product newProduct = productRepo.save(product);
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

    public ProductReqRes getProductById(Integer productId){
        ProductReqRes response = new ProductReqRes();

        try {
            Product product = productRepo.findById(productId).orElseThrow(()-> new RuntimeException("Product Not Found"));
            response.setProduct(product);
            response.setStatusCode(200);
            response.setMessage("Product: " +product+ " found");
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


}
