


import { Router } from "express";
import * as messageService from "./Services/message.service.js";
import { errorHandler  , authenticationMiddleware} from "../../Middleware/index.js";

const messageController = Router();

messageController.post('/send',  errorHandler(messageService.sendMessageService))
messageController.get('/list',  errorHandler(messageService.getMessagesService))
messageController.get('/user-messages', authenticationMiddleware() , errorHandler(messageService.getUserMessagsService))

export {messageController}