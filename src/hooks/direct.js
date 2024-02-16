import axios from '@/lib/axios'

export const useDirect = () => {

    const fetchMessages = ({ setDirectsStructure }) => {
        axios
            .get('api/direct')
            .then(response => setDirectsStructure(response.data.data))
    }

    const fetchChatMessagesWithUser = ({ setMessages, user }) => {
        axios
            .get(`api/direct/${user}`)
            .then(response => setMessages(response.data.messages))
    }

    const updateSeenStatusWithUser =  ({ user }) => {
        axios
            .patch(`api/direct/${user}`)
            .then(() => {})

    }

    const sendMessageToDirectMessageUser = ({ setMessages, messages, newMessage }) => {
        axios
            .post('api/direct', newMessage)
            .then((res) => {
                setMessages([...messages, res.data.message])
            })
    }

    return {
        fetchMessages,
        sendMessageToDirectMessageUser,
        fetchChatMessagesWithUser,
        updateSeenStatusWithUser
    }
}
