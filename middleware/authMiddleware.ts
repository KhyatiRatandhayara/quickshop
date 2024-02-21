import jwt, { Secret } from "jsonwebtoken";
const { TokenExpiredError } = jwt;

interface JwtPayload  {
    userId: string;
}


const verifyToken = async (req, res, next) => {
    try {
        
        let token = req.headers["x-access-token"] || req.headers.authorization || req.body.token || req.query.token;
        if(token.startsWith('Bearer ')){
         token = token.split(' ')[1];
        }
       
        if(!token){
            return res.status(401).send({message : "User token is not provided!."});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret) as JwtPayload;
        /***
         * further method can directly get this userId in req object. 
         */
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if(error instanceof TokenExpiredError) {
            return res.status(401).send({message : "Your Token is expired Please Signin yourself!."});
          } else {
            return res.status(401).send({message : "Authorization has been denied for the request."});
          }
    
    }
}

export { verifyToken }