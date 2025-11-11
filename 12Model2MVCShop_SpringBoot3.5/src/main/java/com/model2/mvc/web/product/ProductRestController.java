package com.model2.mvc.web.product;

import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.model2.mvc.common.Search;
import com.model2.mvc.service.domain.Product;
import com.model2.mvc.service.product.ProductService;

@RestController  // 💡 JSON 반환을 위한 REST Controller 선언
@RequestMapping("/product/*")  // 💡 URL prefix 설정
public class ProductRestController {

    @Autowired
    @Qualifier("productServiceImpl")
    private ProductService productService;

    // ===== 추가: 파일 업로드 경로 주입 =====
    @Value("${file.upload-dir}")
    private String uploadDir;
    // ===== 추가 끝 =====

    public ProductRestController() {
        System.out.println("==> ProductRestController 생성됨");
    }

    /**
     * ✅ 1. 상품 등록
     * @param product : 등록할 상품 정보
     * @throws Exception
     * @return 등록된 상품 정보(JSON)
     * 📌 예제 URL: POST /product/json/addProduct
     * 📌 Content-Type: application/json
     * {
     *     "prodName": "iPhone 15",
     *     "prodDetail": "Apple 신형 스마트폰",
     *     "manuDate": "2025-09-01",
     *     "price": 1500000,
     *     "fileName": "iphone15.jpg"
     * }
     */
    @PostMapping("json/addProduct")
    public Product addProduct(@RequestBody Product product) throws Exception {
        System.out.println("▶ REST:: addProduct() 호출됨");
        productService.addProduct(product);
        return product;
    }

    /**
     * ✅ 2. 상품 상세 조회
     * @param prodNo : 상품 번호 (경로변수)
     * @return 해당 상품 정보(JSON)
     * 📌 예제 URL: GET /product/json/getProduct/10001
     */
    @GetMapping("json/getProduct/{prodNo}")
    public Product getProduct(@PathVariable int prodNo) throws Exception {
        System.out.println("▶ REST:: getProduct() 호출됨 - prodNo: " + prodNo);
        return productService.getProduct(prodNo);
    }

    /**
     * ✅ 3. 상품 리스트 조회
     * @param search : 검색 조건 및 페이지 정보
     * @return 상품 리스트 + 전체 개수(JSON)
     * 📌 예제 URL: GET /product/json/getProductList?currentPage=1&pageSize=10
     */
    @GetMapping("json/getProductList")
    public Map<String, Object> getProductList(@ModelAttribute Search search) throws Exception {
        System.out.println("▶ REST:: getProductList() 호출됨 - page: " + search.getCurrentPage());
        
        if (search.getCurrentPage() == 0) {
            search.setCurrentPage(1);
        }
        if (search.getPageSize() == 0) {
            search.setPageSize(10);  // 기본 페이지 사이즈
        }

        return productService.getProductList(search);
    }

    /**
     * ✅ 4-1. 상품 정보 수정 조회 (파일 업로드용 - 멀티파트 폼 방식)
     * @param prodNo : 상품 번호
     * @return 해당 상품 정보(JSON)
     * 📌 예제 URL: GET /product/json/updateProduct/10001
     */
    @GetMapping("json/updateProduct/{prodNo}")
    public Product getProductForUpdate(@PathVariable int prodNo) throws Exception {
        System.out.println("▶ REST:: getProductForUpdate() 호출됨 - prodNo: " + prodNo);
        return productService.getProduct(prodNo);
    }

    /**
     * ✅ 4-2. 상품 정보 수정 (파일 업로드 포함)
     * @param product : 수정할 상품 정보
     * @param uploadFile : 업로드할 파일
     * @return 수정된 상품 정보(JSON)
     * 📌 예제 URL: POST /product/json/updateProduct
     * 📌 Content-Type: multipart/form-data
     * 📌 FormData 형식으로 전송:
     *    - prodNo: 10001
     *    - prodName: 수정된 상품명
     *    - prodDetail: 수정된 상세정보
     *    - manuDate: 2025-11-11
     *    - price: 100000
     *    - uploadFile: (파일)
     */
    @PostMapping("json/updateProduct")
    public Product updateProductWithFile(
            @ModelAttribute Product product,
            @RequestParam(value = "uploadFile", required = false) MultipartFile uploadFile) throws Exception {
        
        System.out.println("▶ REST:: updateProductWithFile() 호출됨 - prodNo: " + product.getProdNo());
        
        // 파일 업로드 처리
        if (uploadFile != null && !uploadFile.isEmpty()) {
            File uploadDirFile = new File(uploadDir);
            
            // 폴더가 없으면 생성
            if (!uploadDirFile.exists()) {
                boolean created = uploadDirFile.mkdirs();
                System.out.println("[Upload] 디렉토리 생성: " + created);
                System.out.println("[Upload] 경로: " + uploadDirFile.getAbsolutePath());
            }
            
            // 파일명 설정 (원본 파일명 사용)
            String savedFileName = uploadFile.getOriginalFilename();
            File dest = new File(uploadDirFile, savedFileName);
            
            // 파일 저장
            uploadFile.transferTo(dest);
            System.out.println("[Upload] 파일 저장 성공: " + dest.getAbsolutePath());
            
            // 로그 파일 기록
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String nowStr = sdf.format(new Date());
            File logFile = new File(uploadDirFile, "upload_log.txt");
            try (FileWriter fw = new FileWriter(logFile, true)) {
                fw.write("Uploaded: " + savedFileName + " at " + nowStr + "\n");
            }
            
            // Product 객체에 파일명 저장
            product.setFileName(savedFileName);
        } else {
            System.out.println("[Upload] 파일 선택 안됨. 기존 파일 유지");
        }
        
        // 상품 정보 업데이트
        productService.updateProduct(product);
        
        // 업데이트된 상품 정보 반환
        return productService.getProduct(product.getProdNo());
    }

    /**
     * ✅ 4-3. 상품 정보 수정 (JSON 방식 - 파일 제외)
     * @param product : 수정할 상품 정보
     * @return 수정된 상품 정보(JSON)
     * 📌 예제 URL: PUT /product/json/updateProductJson
     * 📌 Content-Type: application/json
     */
    @PutMapping("json/updateProductJson")
    public Product updateProduct(@RequestBody Product product) throws Exception {
        System.out.println("▶ REST:: updateProduct() 호출됨 - prodNo: " + product.getProdNo());
        productService.updateProduct(product);
        return productService.getProduct(product.getProdNo());
    }
    
    /**
     * ✅ 5. 상품 리스트 조회 무한스크롤
     * @param search : 검색 조건 및 페이지 정보
     * @return 상품 리스트 + 전체 개수(JSON)
     * 📌 예제 URL: GET /product/json/getProductList?currentPage=1&pageSize=10
     */
    @GetMapping("json/getProductListScroll")
    public Map<String, Object> getProductListScroll(@ModelAttribute Search search) throws Exception {
        System.out.println("▶ REST:: getProductListScroll() 호출됨 - page: " + search.getCurrentPage());
        
        if (search.getCurrentPage() == 0) {
            search.setCurrentPage(1);
        }
        if (search.getPageSize() == 0) {
            search.setPageSize(10);  // 기본 페이지 사이즈
        }

        return productService.getProductList(search);
    }

    /**
     * ✅ 6. 상품명 자동완성 목록 조회
     * @param term : 검색어
     * @return 상품명 List(JSON)
     * 📌 예제 URL: GET /product/json/getProductNameList?term=iPhone
     */
    @GetMapping("json/getProductNameList") 
    public List<String> getProductNameList(@RequestParam("term") String term) throws Exception {
        System.out.println("▶ REST:: getProductNameList() 호출됨 - term: " + term);
        return productService.getProductNameList(term);
    }
    
}