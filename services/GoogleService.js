const GoogleModel = require('../models').google_users;

class GoogleService {

    async createGoogleUser(profileName, profileId, userId){
        return await GoogleModel.create({
            profile_name: profileName,
            profile_id: profileId,
            user_id: userId,
            created_at: Date()
        })
        .then(data => {
            return {message: data.toJSON(), status: 1};
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })
    }


    async getUserByGoogleId(profileId){
        return await GoogleModel.findAll({
            where: {
                profile_id: profileId
            },
            raw: true,
            plain: true 
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })              
    }        

}

module.exports = GoogleService;