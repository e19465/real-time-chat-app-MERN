import { Loader2Icon, Paperclip, SendIcon, XCircle } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import MessageService from "../../services/MessageService";
import { globalErrorHandler } from "../../helpers/responseHandler";

const SendMessage = ({ user }) => {
  //! State
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [sending, setSending] = useState(false);

  //! Access store to perform actions
  const userId = useAuthStore((store) => store.userId);
  const addMessage = useChatStore((store) => store.addMessage);
  const clearMessageById = useChatStore((store) => store.clearMessageById);

  //! Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  //! Handle file removal
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  //! Handle sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    try {
      setSending(true);
      let formData = new FormData();
      formData.append("text", trimmedMessage);
      files.forEach((file) => {
        formData.append("files", file);
      });
      MessageService.createMessage(user._id, formData);
    } catch (err) {
      globalErrorHandler(err, "Error sending message", "Error sending message");
    } finally {
      setSending(false);
      setMessage("");
    }
  };

  return (
    <form
      className="w-full min-h-[120px] h-auto bg-primary/10 flex flex-col items-center justify-center sticky bottom-0"
      onSubmit={handleSendMessage}
    >
      {files.length > 0 && (
        <div className="w-full h-[100px] flex items-center justify-center flex-wrap gap-2 overflow-y-auto scrollbar-hide">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-1 p-1 rounded-md shadow-md bg-secondary/20 border border-primary border-opacity-10"
            >
              <span className="text-sm">{file.name}</span>
              <button
                className="text-red-500"
                onClick={() => handleRemoveFile(index)}
                title="Remove file"
              >
                <XCircle className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center">
        <textarea
          name="send-message-textarea"
          id="send-message-textarea"
          className="max-w-full flex-grow h-full resize-none p-4 border-t border-l border-b border-primary border-opacity-50"
          placeholder="Type a message..."
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="flex flex-col p-4 items-center justify-center gap-4 border border-primary border-opacity-50 h-full w-auto">
          <label
            htmlFor="send-file-message"
            title="Choose files"
            className="cursor-pointer"
          >
            <Paperclip className="size-4 sm:size-6" />
          </label>
          <input
            type="file"
            name="send-file-message"
            id="send-file-message"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
          <button
            className=""
            title="Send message"
            type="submit"
            disabled={sending}
          >
            {sending ? (
              <Loader2Icon className="animate-spin size-4 sm:size-6" />
            ) : (
              <SendIcon className="size-4 sm:size-6" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
