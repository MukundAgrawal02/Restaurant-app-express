const JWT = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try {
        // Extract the token from the Authorization header
        const token = req.headers["authorization"].split(' ')[1];
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Invalid token. Please login again"
                });
            }
            else{
                req.body.id = decode.id;
                next();
            }
        })
  
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Unauthorized Access. Please login to access this route",
            error
        });
    }
}