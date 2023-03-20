const { Router } = require('express')
const { findOrCreateConversation, findConversationUser, deleteConversationUser, findConversations } = require('../controller/Conversation.Controller')
const router = Router()

router.post('/', findOrCreateConversation)
router.get('/', findConversationUser)
router.post('/ids', findConversations)
router.delete('/:id', deleteConversationUser)

module.exports = router;