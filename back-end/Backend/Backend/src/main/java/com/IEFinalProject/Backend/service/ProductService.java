package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.ProductReqRes;
import com.IEFinalProject.Backend.model.Category;
import com.IEFinalProject.Backend.model.OurUsers;
import com.IEFinalProject.Backend.model.ProductImages;
import com.IEFinalProject.Backend.model.Products;
import com.IEFinalProject.Backend.repository.CategoryRepo;
import com.IEFinalProject.Backend.repository.ProductImagesRepo;
import com.IEFinalProject.Backend.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRepo categoryRepo;


    @Transactional
    public ProductReqRes addProduct(ProductReqRes addProductRequest){
        ProductReqRes response = new ProductReqRes();

        try {
            Products products = new Products();
            Category category = categoryRepo.findByName(addProductRequest.getCategory().getName());
            products.setName(addProductRequest.getName());
            products.setDescription(addProductRequest.getDescription());
            products.setPrice(addProductRequest.getPrice());
            products.setCategory(category);
            Products newProduct = productRepo.save(products);
            if (newProduct.getProductId() >= 0){
                response.setProducts(newProduct);
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

    public ProductReqRes deleteProduct(Integer productId){
        ProductReqRes response = new ProductReqRes();

        try {
            Optional<Products> product = productRepo.findById(productId);
            if(product.isPresent()){
                productRepo.deleteById(productId);
                response.setStatusCode(200);
                response.setMessage("User Deleted Successfully");
            }else{
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }

        return response;
    }

    public ProductReqRes getAllProducts(){
        ProductReqRes response = new ProductReqRes();
        try {
            List<Products> products = productRepo.findAll();
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
}
