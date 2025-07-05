import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import MessagesSkeleton from './skeletons/MessagesSkeleton'
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
    const { authUser } = useAuthStore();
    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
        }
        // getMessages(selectedUser._id)
    }, [selectedUser, getMessages])
    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessagesSkeleton />
                <MessagesInput />
            </div>
        )
    }
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 spacey-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId=== authUser._id ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img 
                                src={message.senderId === authUser._id 
                                    ? authUser.profilePicture || "/avatar.png" 
                                    : selectedUser.profilePicture || "/avatar.png"}
                                alt='个人资料图片'
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className='text-xs opacity-50 ml-1'>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble felx flex-col">
                            {message.image && (
                                <img
                                src={message.image}
                                alt='Attachment'
                                className='sm:max-w-[200px] rounded-md mb-2' 
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <MessagesInput />
        </div>
    )
}

export default ChatContainer