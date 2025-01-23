
export const validationMiddleware = (Schema)=>{
    return (req,res,next)=>{
        const schemaKeys = Object.keys(Schema)        

        const validationErrors = []
        schemaKeys.forEach((key)=>{
            const {error} = Schema[key].validate(req[key] , {abortEarly:false})
            if(error) validationErrors.push(error.details.map((err)=>err.message))
        })

        if(validationErrors.length > 0){    
           return res.status(400).json({ message: 'Validation failed', errors: validationErrors })
        }

        next()
    }
}