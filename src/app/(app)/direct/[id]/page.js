'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'
import { useDirect } from '@/hooks/direct'
import echo from '@/lib/echo'
import useSWR from 'swr'
import axios from '@/lib/axios'


const DirectChat = () => {
    const params = useParams()
    const router = useRouter();
    const [messages, setMessages] = useState(null);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(false);
    const [channel, setChannel] = useState(null);

    const { fetchChatMessagesWithUser, sendMessageToDirectMessageUser, updateSeenStatusWithUser } = useDirect()
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    useEffect(() => {
        if (user?.id === Number(params.id)) {
            router.push('/direct');
        }
    }, [user, params, router]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if (disabled) return;
        setDisabled(true);

        // Here you would handle sending a message, but for demonstration purposes, we'll just update the state
        const newMessage = {
            sender_id: user?.id,
            receiver_id: params.id,
            text: inputText,
        };

        await sendMessageToDirectMessageUser({ setMessages, messages, newMessage })
        setInputText('');
        setDisabled(false);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && !disabled) {
            e.preventDefault(); // Prevent the default behavior of Enter key
            await handleSend();
        }
    };

    useEffect(() => {
        if (messages === null && user) {
            const fetchChatMessages = async () => {
                await fetchChatMessagesWithUser({ setMessages, user: params.id })
            }

            fetchChatMessages()
                .catch(console.error)
        }
        setLoading(false)

        if (messages !== null) {
            scrollToBottom();
            channel.listen('NewChatDirectMessage', (e) => {
                setMessages([...messages, e])
            })
        }
    }, [messages]);

    useEffect(() => {
        setChannel(
            echo
                .private(params.id < user?.id ? `chat.dm.${params.id}.${user?.id}` : `chat.dm.${user?.id}.${params.id}`)
        )

        const fetchUpdateSeen = async () => {
            await updateSeenStatusWithUser({ user: params.id })
        }

        fetchUpdateSeen()
            .catch(console.error)
    }, []);

    return (
        <>
        {
            (messages && loading === false) &&
            (<div className="flex flex-col h-screen">
                <div className="flex-grow overflow-y-auto flex flex-col">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-3 ${msg.sender_id !== user?.id ? 'self-start' : 'self-end'}`}
                        >
                            <div className={`flex flex-col ${msg.sender_id !== user?.id ? 'items-start' : 'items-end'}`}>
                                <small className="text-sm text-gray-300 text-center">{!!msg.sender.deleted_at && msg.sender_id !== user?.id ? 'Deactivated user' : msg.sender.name} {msg.sender_id === user?.id && '(You)'}</small>
                                <div className="flex flex-row items-center">
                                    {msg.sender_id !== user?.id &&
                                        (<>{ msg.sender.avatar && !!!msg.sender.deleted_at ? (
                                        <img
                                            className="h-7 w-7 fill-current rounded-full"
                                            src={msg.sender.avatar}
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <svg
                                            className="h-7 w-7 fill-current rounded-full text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    )}
                                    </>)}
                                    <div
                                        className={`mx-2 rounded-lg py-2 px-4 ${msg.sender_id !== user?.id ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}
                                    >
                                        {msg.text}
                                    </div>
                                    {msg.sender_id === user?.id &&
                                        (<>{ msg.sender.avatar ? (
                                            <img
                                                className="h-7 w-7 fill-current rounded-full"
                                                src={msg.sender.avatar}
                                                alt="Avatar"
                                            />
                                        ) : (
                                            <svg
                                                className="h-7 w-7 fill-current rounded-full text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        )}
                                        </>)}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex items-center p-4">
                    <input
                        type="text"
                        value={inputText}
                        onKeyDown={async (e) => { await handleKeyDown(e) }}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-full py-2 px-4 mr-4 text-black"
                        placeholder="Type your message..."
                        required
                    />
                    <button
                        onClick={async () => { await handleSend() }}
                        className={`text-white rounded-full px-4 py-2 font-semibold hover:bg-blue-600 ${disabled ? 'bg-blue-300' : 'bg-blue-500'}`}
                        disabled={disabled}
                    >
                        Send
                    </button>
                </div>
            </div>
            )
        }
        </>
    );

}

export default DirectChat
