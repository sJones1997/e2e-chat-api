const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserService = require('../services/UserService');
const GoogleService = require('../services/GoogleService');

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.API_HOST}/api/auth/google/redirect`    
    }, async (accessToken, refreshToken, profile, done) => {
        const userService = new UserService();
        const googleService = new GoogleService();
        const googleUser = await googleService.getUserByGoogleId(profile.id);
        if(!googleUser){
            const newUser = await userService.createUser(profile.displayName);
            if(newUser.status){
                const newGoogleUser = await googleService.createGoogleUser(profile.displayName, profile.id, newUser.message.id);
                if(newGoogleUser.status){
                    console.log(newUser)
                    done(null, {userId: newUser.message.id, googleDetails: newGoogleUser});                    
                }
                return {'message': 'Problem creating google user', 'status': 0}
            }
            return {'message': 'Problem creating user', 'status': 0}
        }
        console.log(googleUser)
        done(null, googleUser);
    })
)