const corsOrigin = (req, callback) => {
    const allowedOrigins = [process.env.CLIENT_HOST];
    const origin = req.headers.origin;
    let corsOptions;
    if(allowedOrigins.includes(origin)){    
        corsOptions = {origin: true, methods: ['GET', 'PUT', 'POST', 'DELETE'], allowedHeaders: ['Content-Type', 'authorization'], credentials: true }
    } else {
        corsOptions = {origin: false}
    }
    callback(null, corsOptions);
}

module.exports = corsOrigin;