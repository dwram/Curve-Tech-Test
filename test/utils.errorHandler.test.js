import { expect } from 'chai'
import customErrorHandler from '../utils/errorHandler.js'

describe('CustomErrorHandler', () => {

    const testErrorMessage = "test eRroR messAge"
    const newError = new customErrorHandler(testErrorMessage)
    const errors = customErrorHandler.getAllErrors()

    it('It returns a customErrorHandler instance upon instantiation', () => {
        expect(newError.constructor.name).to.equal(customErrorHandler.name)
    })
    
    it('It is a child of the Error superclass', () => {
        const parentClassType = Object.getPrototypeOf(newError.constructor.prototype).constructor.name
        expect(parentClassType).to.equal(Error.prototype.name)
    })

    it('It returns a list of errors using getAllErrors', () => {
        expect(typeof errors).to.equal(typeof [])
        expect(errors[0].constructor.name).to.equal(customErrorHandler.name)
        expect(errors.length).to.be.greaterThan(0)
    })

    it('The list of errors contain a stack trace with line numbers and their message', () => {
        const errorMessages = []
        for(const error of errors) {
            expect(error).to.have.property('message')
            expect(error).to.have.property('stack')
            errorMessages.push(error.message)
        }
        expect(errorMessages.some(val => val === testErrorMessage)).to.be.true
    })
})