import { User , Message } from "../../../DB/models/index.js"


export const sendMessageService = async(req, res) => {
    const  { body , ownerId} = req.body

    // check if owner id is valid
    const user  = await User.findById(ownerId)
    if(!user){
        return res.status(404).json({ message: 'User not found' })
    }

    // create the message
    const message = await Message.create({
        body,
        ownerId
    })

    res.status(201).json({ message: 'Message sent successfully', message })
}


// Only for apply the populate on the owner id
export const getMessagesService = async(req, res) => {
    const messages = await Message.find({})
    .populate(
        [
            {
                path:'ownerId',
                select:'-password -__v'
            }
        ]
    )
    res.status(200).json({ message: 'Success', data:messages })
}



// Get user messages
export  const getUserMessagsService = async(req, res) => {
    
    const {_id} = req.loggedInUser  
    const messages = await Message.find({ownerId:_id})

    res.status(200).json({ message: 'Success', data:messages })

}