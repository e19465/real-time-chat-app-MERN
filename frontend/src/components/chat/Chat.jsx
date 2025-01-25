import { ArrowDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Chat = ({ user }) => {
  //! Hooks
  const chatContainerRef = useRef(null);

  //! State
  const [showScrollButton, setShowScrollButton] = useState(false);

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
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  //! Scroll to bottom when the component renders
  useEffect(() => {
    if (chatContainerRef.current) {
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
  }, []);

  return (
    <div
      className="flex-1 h-auto overflow-y-auto w-full bg-red-950 relative scroll-smooth"
      ref={chatContainerRef}
    >
      <div className="h-[1700px] w-full">chat messages</div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          className="sticky bottom-4 left-[95%] p-3 rounded-full shadow-lg"
          title="Scroll to bottom"
          onClick={scrollToBottom}
        >
          <ArrowDownIcon className="size-4" />
        </button>
      )}
    </div>
  );
};

export default Chat;
