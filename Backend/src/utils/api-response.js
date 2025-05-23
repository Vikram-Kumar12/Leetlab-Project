class ApiResponse {
    constructor(
        statusCode,
        message,
        data= "Success"
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // true

        // console.log("statusCode",statusCode);
        console.log("datas :",data);
        console.log("message :",message);
        // console.log("success",success);
        
    }
}
export {ApiResponse};