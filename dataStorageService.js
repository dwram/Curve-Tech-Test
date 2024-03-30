import customErrorHandler from "./utils/errorHandler.js";
import Contract from "./models/contract.js";
import Track from "./models/track.js";

class DataStorageService {

    static async saveContract(data) {
        if(!data || !data.name) {
            return new customErrorHandler(`A name property must be present on the object`)
        }
        return await new Contract(data).save()
    }

    static async saveTrack(trackData) {
        let contractId = null;

        const contract = await Contract.findOne({ name: trackData.contract })

        if(trackData.contract) {
            if (contract) { // Contract name exists, contract found, save association to contract ID
                console.log(`Contract name "${contract.name}" exists with id: "${contract._id}" and is being associated to the track`)
                contractId = contract._id
            } else {
                // Contract name exists, no contract found, return error
                return new customErrorHandler(`The specified contract named "${trackData.contract}" cannot be found in the contract collection`)
            }
        } else { // No contract name exists, save track without association
            console.warn('No contract exists on this Track data. Saving without contractId association.')
        }

        const track = new Track({
            ...trackData,
            ...(contractId && { contractId })
        })
        
        return await track.save()
    }

}

export default DataStorageService