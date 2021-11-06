const GoogleModel = require('../models').google_users;
const UserModel = require('../models').users;

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
            return {message: err.message, status: 0};
        })
    }

    async getUserByGoogleId(profileId){
        return await GoogleModel.findAll({
            attributes: [['user_id', 'userId'], ['profile_name', 'username']],
            include: {
                model: UserModel,
                attributes: ["*"],
                require: true,
                as: 'gu'
            },            
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
            return {message: err.message, status: 0};
        })              
    }     
    
    async getGoogleUser(userId){
        return await GoogleModel.findAll({
            attributes: ['*', ['profile_name', 'username']],
            where: {
                user_id: userId
            },
            raw: true,
            plain: true 
        })
        .then(data => {
            return {message: data, status: 1};
        })
        .catch(err => {
            return {message: err.message, status: 0};
        })  
    }

}

module.exports = GoogleService;