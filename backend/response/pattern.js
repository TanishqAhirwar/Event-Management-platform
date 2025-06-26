class ApiResponse {
    constructor(status, data, message,token) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.token = token
    }
}

module.exports = ApiResponse;