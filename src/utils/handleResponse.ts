export const handleResponse = (data: any, code: any, success: any, message: any) => {
    return {
        data: data,
        success: success,
        code: code,
        message: message
    };
}