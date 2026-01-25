import { response } from "../utils/index.js"

const errorHandler = (err, req, res, next) => {
    if (err.isJoi) {
        return response(res, 400, err.details[0].message, null);
    }

    const status = 500;
    const message = "Internal Server Error"

    console.error('Unhandled error: ', err);
    return response(res, status, message, null);
}

export default errorHandler;