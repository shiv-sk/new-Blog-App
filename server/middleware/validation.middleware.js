const validationMiddleware = (schema)=>{
    return (req , res , next)=>{
        console.log("user input is validating! ");
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                status:"failed",
                message:error.details[0].message
            })
        }
        next();
    };
};

module.exports = validationMiddleware;