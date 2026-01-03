import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div className={`flex gap-3 items-center hover:bg-sky-500 rounded p-3 py-2 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
                onClick={() => setSelectedConversation(conversation)}
            >
                {/* <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img
                            src={conversation.profilePicture}
                            alt='user avatar'
                        />
                    </div>
                </div> */}

                <div className="relative">
                    <div className="w-12 rounded-full overflow-hidden">
                        <img
                            src={conversation.profilePicture}
                            alt="user avatar"
                        />
                    </div>

                    {isOnline && (
                        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                    )}
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};
export default Conversation;