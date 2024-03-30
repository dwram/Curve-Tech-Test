const allErrors = []

class customErrorHandler extends Error {

    constructor(message) {
        super(message)
        allErrors.push(this)
    }

    static getAllErrors() {
        return [...allErrors]
    }

}

export default customErrorHandler