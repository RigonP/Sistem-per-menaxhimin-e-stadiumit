package com.inn.stadium.serviceImpl;

import com.inn.stadium.JWT.JwtFilter;
import com.inn.stadium.POJO.Bill;
import com.inn.stadium.konstantet.StadiumConstants;
import com.inn.stadium.repository.BillDao;
import com.inn.stadium.service.BillService;
import com.inn.stadium.utils.StadiumUtils;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.io.IOUtils;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;
@Slf4j
@Service
public class BillServiceImpl implements BillService {

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    BillDao billDao;


    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
    log.info("Inside generateReport");
        try {
            String fileName;
            if(validateRequestMap(requestMap)){
                if(requestMap.containsKey("isGenerate") && !(Boolean)requestMap.get("isGenerate")){
                    fileName=(String)requestMap.get("uuid");
                }else{
                    fileName = StadiumUtils.getUUID();
                    requestMap.put("uuid",fileName);
                    insertBill(requestMap);
                }

                String data= "Name : " + requestMap.get("name") + "\n" + "Contact Number : " + requestMap.get("contactNumber") + "\n"
                        + "Email : " + requestMap.get("email") + "\n" + "Payment Method : " + requestMap.get("paymentMethod");

                Document document = new Document();
                PdfWriter.getInstance(document,new FileOutputStream(StadiumConstants.STORE_LOCATION+"\\" + fileName+".pdf"));

                document.open();
                setRectangleInPDF(document);

                //Titulli i pdf file
                Paragraph chunk =new Paragraph("Stadium Management System " ,getFont("Header"));
                chunk.setAlignment(Element.ALIGN_CENTER);
                document.add(chunk);
                //Paragrafi
                Paragraph paragraph =new Paragraph(data + " \n \n " ,getFont("Data"));
                document.add(paragraph);

                //Tabela
                PdfPTable table = new PdfPTable(5);
                table.setWidthPercentage(100);
                addTableHeader(table);

                JSONArray jsonArray = StadiumUtils.getJsonArrayFromString((String)requestMap.get("productDetails"));

                for (int i = 0; i<jsonArray.length();i++){
                    addRows(table,StadiumUtils.getMapFromJson(jsonArray.getString(i)));
                }
                document.add(table);

                Paragraph footer = new Paragraph("Total : " + requestMap.get("totalAmount") + "\n"
                        + "Ju faleminderit per visiten. Ndjehuni te lire te na vizitoni perseri!!",getFont("Data") );
                document.add(footer);
                document.close();
                return new ResponseEntity<>("{\"uuid\":\""+fileName+"\"}",HttpStatus.OK);
            }
            return StadiumUtils.getResponseEntity("Te dhenat qe kerkohen nuk u gjeten!" ,HttpStatus.BAD_REQUEST);

        }catch (Exception e){
            e.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private void addRows(PdfPTable table, Map<String, Object> data) {
        log.info("INside addRows");
        table.addCell((String) data.get("name"));
        table.addCell((String) data.get("category"));
        table.addCell((String) data.get("quantity"));
        table.addCell((String) data.get((Double)data.get("price")));
        table.addCell(Double.toString((Double)data.get("total")));
    }

    private void addTableHeader(PdfPTable table) {
        log.info("log inside addTableHeader");

        Stream.of("Name","Category","Quantiy","Price","Sub Total")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    header.setBackgroundColor(BaseColor.YELLOW);
                    header.setHorizontalAlignment(Element.ALIGN_CENTER);
                    header.setVerticalAlignment(Element.ALIGN_CENTER);
                    table.addCell(header);

                });
    }

    private Font getFont(String type) {
        log.info("Inside getFont");
        switch (type){
            case "Header":
                Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE,18,BaseColor.BLACK);
                headerFont.setStyle(Font.BOLD);
                return  headerFont;
            case "Data":
                Font dataFont = FontFactory.getFont(FontFactory.TIMES_ROMAN,11,BaseColor.BLACK);
                dataFont.setStyle(Font.BOLD);
                return dataFont;
            default:
                return new Font();
        }
    }

    private void setRectangleInPDF(Document document) throws DocumentException {
            log.info("Inside setRectangleInPDF");
        Rectangle rect = new Rectangle(577,825,18,15);
        rect.enableBorderSide(1);
        rect.enableBorderSide(2);
        rect.enableBorderSide(4);
        rect.enableBorderSide(8);
        rect.setBorderColor(BaseColor.GREEN);
        rect.setBorderWidth(1);
        document.add(rect);


    }

    private void insertBill(Map<String, Object> requestMap) {
        try {

            Bill bill = new Bill();

            String uuid = (String) requestMap.get("uuid");
            String name = (String) requestMap.get("name");
            String email = (String) requestMap.get("email");
            String contactNumber = (String) requestMap.get("contactNumber");
            String paymentMethod = (String) requestMap.get("paymentMethod");
            String totalAmount = (String) requestMap.get("totalAmount");
            String productDetails = (String) requestMap.get("productDetails");

            if (uuid == null || uuid.isEmpty()) {
                throw new IllegalArgumentException("UUID smund te jete null apo e zbrazet");
            }
            if (name == null || name.isEmpty()) {
                throw new IllegalArgumentException("Emri smund te jete null apo e zbrazet");
            }
            if (email == null || email.isEmpty()) {
                throw new IllegalArgumentException("Emaili smund te jete null apo e zbrazet");
            }
            if (contactNumber == null || contactNumber.isEmpty()) {
                throw new IllegalArgumentException("Kontaki smund te jete null apo e zbrazet");
            }
            if (paymentMethod == null || paymentMethod.isEmpty()) {
                throw new IllegalArgumentException("Pagesa smund te jete null apo e zbrazet");
            }
            if (totalAmount == null || totalAmount.isEmpty()) {
                throw new IllegalArgumentException("Total amount smund te jete null apo e zbrazet");
            }
            if (productDetails == null || productDetails.isEmpty()) {
                throw new IllegalArgumentException("Te dhenat e produktit smund te jene null apo e zbrazet");
            }

            bill.setUuid(uuid);
            bill.setName(name);
            bill.setEmail(email);
            bill.setContactNumber(contactNumber);
            bill.setPaymentMethod(paymentMethod);
            bill.setTotal(Integer.parseInt(totalAmount));
            bill.setProductDetails(productDetails);
            bill.setCreatedBy(jwtFilter.getCurrentUser());

            billDao.save(bill);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }


    private boolean validateRequestMap(Map<String, Object> requestMap) {
        log.info("Inside validateRequestMap");
        if(requestMap.containsKey("name") && requestMap.containsKey("contactNumber") && requestMap.containsKey("email")
                && requestMap.containsKey("paymentMethod") && requestMap.containsKey("totalAmount")
                && requestMap.containsKey("productDetails")){
            return true;
        }
        return false;
    }



    @Override
    public ResponseEntity<List<Bill>> getBills() {
        List<Bill> list = new ArrayList<>();
        if(jwtFilter.isAdmin()){
            list = billDao.getAllBills();
        }else{
            list = billDao.getBillByUserName(jwtFilter.getCurrentUser());
        }
        return  new ResponseEntity<>(list,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
    log.info("Inside GetPdf : requestMap {}",requestMap);
        try {
            byte[] byteArray = new byte[0];
            if(!requestMap.containsKey("uuid") && validateRequestMap(requestMap))
                return new ResponseEntity<>(byteArray,HttpStatus.BAD_REQUEST);

            String filePath = StadiumConstants.STORE_LOCATION+"\\" + (String) requestMap.get("uuid")+".pdf";

            if(StadiumUtils.isFileExist(filePath)){
                byteArray = getByteArray(filePath);
                return  new ResponseEntity<>(byteArray,HttpStatus.OK);
            }else {
                requestMap.put("isGenerate",false);
                generateReport(requestMap);
                byteArray=getByteArray(filePath);
                return new ResponseEntity<>(byteArray,HttpStatus.OK);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    private byte[] getByteArray(String filePath)throws Exception {

        File initialFile = new File(filePath);
        InputStream targetStream = new FileInputStream(initialFile);
        byte[] byteArray = IOUtils.toByteArray(targetStream);
        targetStream.close();
        return  byteArray;
    }

    @Override
    public ResponseEntity<String> deleteBill(Integer id) {
        try {

            Optional optional = billDao.findById(id);
            if(!optional.isEmpty()){
                billDao.deleteById(id);
                return StadiumUtils.getResponseEntity("Fatura u fshie me sukse",HttpStatus.OK);
            }
            return StadiumUtils.getResponseEntity("Fatura id nuk ekziston" ,HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return StadiumUtils.getResponseEntity(StadiumConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
