import Contract from "./models/contract.js";
import Track from "./models/track.js";

class DataStorageService {

    static async saveContract(data) {
        if(!data || !data.name) {
            throw new Error(`You must provide an object with a name property`)
        }
        return await new Contract(data).save()
    }

    static async saveTrack(trackData) {
        try { 
            let contractId = null;

            const contract = await Contract.findOne({ name: trackData.contract })
    
            if(trackData.contract) {
                if (contract) { // Contract name exists, contract found, save association to contract ID
                    console.log(`Contract name "${contract.name}" exists with id: "${contract._id}" and is being associated to the track`)
                    contractId = contract._id
                } else {
                    // Contract name exists, no contract found, return error
                    throw new Error(`The specified contract named "${trackData.contract}" cannot be found in the contract collection`)
                }
            } else { // No contract name exists, save track without association
                console.warn('No contract exists on this Track data. Saving without contractId association.')
            }

            const track = new Track({
                ...trackData,
                ...(contractId && { contractId })
            })
            
            return await track.save()
        } catch (error) {
            throw error
        }
    }

}

export default DataStorageService