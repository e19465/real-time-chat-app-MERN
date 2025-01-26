import { ArrowDownIcon, MessageCircle, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MessageService from "../../services/MessageService";
import { globalErrorHandler } from "../../helpers/responseHandler";
import { useNavigate } from "react-router-dom";
import { CommonPageUrls } from "../../constants/pageUrls";
import { useAuthStore } from "../../store/useAuthStore";
import { checkUrlIsImage, getFileType } from "../../helpers/shared";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useChatStore } from "../../store/useChatStore";
import Modal from "../shared/Modal";

const Chat = ({ user }) => {
  //! Hooks
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  //! Access store to perform actions
  const loggedInUserId = useAuthStore((store) => store.userId);
  const messages = useChatStore((store) => store.messages);
  const setMessages = useChatStore((store) => store.setMessages);
  const clearMessageById = useChatStore((store) => store.clearMessageById);

  //! State
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState(null);

  //! Detect when user scrolls away from the bottom
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const isAtBottom =
        chatContainerRef.current.scrollHeight -
          chatContainerRef.current.scrollTop ===
        chatContainerRef.current.clientHeight;
      setShowScrollButton(!isAtBottom); // Show button if not at the bottom
    }
  };

  //! Scroll to bottom when the component renders or the button is clicked
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }, 50);
    }
  };

  //! Scroll to bottom when the component renders
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      // Automatically scroll to bottom when the component renders
      scrollToBottom();
    }

    // Add scroll event listener to handle visibility of the scroll button
    const container = chatContainerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      container.removeEventListener("scroll", handleScroll);
    };
  }, [messages]);

  //! Fetch messages when the user changes
  useEffect(() => {
    if (user) {
      const fetchMessages = async () => {
        try {
          setLoading(true);
          const response = await MessageService.getMessages(user._id);
          setMessages(response.data);
        } catch (err) {
          globalErrorHandler(
            err,
            "Error fetching messages",
            "Something went wrong, please try again later"
          );
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    } else {
      navigate(CommonPageUrls.home, { replace: true });
    }
  }, [user]);

  //! Method to delete a message
  const handleDeleteMessage = async () => {
    try {
      console.log("Deleting message with id: ", messageToDeleteId);
      setDeleting(true);
      const response = await MessageService.deleteMessages(user._id, [
        messageToDeleteId,
      ]);
      console.log("Deleted message: ", response);
      clearMessageById(messageToDeleteId);
    } catch (err) {
      globalErrorHandler(
        err,
        "Error deleting message",
        "Something went wrong, please try again later"
      );
    } finally {
      setDeleting(false);
      setModalOpen(false);
    }
  };

  return (
    <div
      className="flex-1 h-auto overflow-y-auto w-full relative scroll-smooth z-10"
      ref={chatContainerRef}
    >
      {loading ? (
        <MessageSkeleton />
      ) : (
        <>
          {messages?.length > 0 ? (
            messages?.map((message) => (
              <div
                key={message._id}
                className={`w-full p-2 flex relative ${
                  message.senderId === loggedInUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`min-w-[20%] max-w-[70%] p-3 rounded-lg shadow-md text-sm ${
                    message.senderId === loggedInUserId
                      ? "bg-neutral text-base"
                      : "bg-base-300 text-primary"
                  }`}
                >
                  {message.text && <p>{message.text}</p>}

                  {/* Display images or files */}
                  {message.files?.length > 0 && (
                    <div className="mt-2">
                      {message?.files?.map((file, index) => (
                        <a
                          key={index}
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-1 text-blue-600 underline text-xs"
                        >
                          {checkUrlIsImage(file)
                            ? "View Image"
                            : `download ${getFileType(file)}`}
                        </a>
                      ))}
                    </div>
                  )}

                  <span className="block text-xs mt-2">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>

                  {message.senderId === loggedInUserId && (
                    <button
                      className="absolute bottom-2 right-2 p-1"
                      title="Delete"
                      onClick={() => {
                        setMessageToDeleteId(message._id);
                        setModalOpen(true);
                      }}
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full w-full flex flex-col gap-1 text-sm items-center justify-center text-primary animate-pulse">
              <MessageCircle className="size-8" />
              <span className="font-semibold">No messages yet</span>
              <span>Say hi to start a chat</span>
            </div>
          )}
        </>
      )}

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          className="sticky bottom-4 left-[95%] p-3 rounded-full shadow-lg z-50"
          title="Scroll to bottom"
          onClick={scrollToBottom}
        >
          <ArrowDownIcon className="size-4" />
        </button>
      )}

      {modalOpen && (
        <Modal
          dialogQuestion={"Delete message?"}
          dialogText={"This action cannot be undone"}
          Icon={Trash2Icon}
          isModelOpen={modalOpen}
          handleClose={() => setModalOpen(false)}
          isLoading={deleting}
          handleAccept={handleDeleteMessage}
          loadingText={"Deleting..."}
          notLoadingText={"Delete"}
        />
      )}
    </div>
  );
};

export default Chat;
