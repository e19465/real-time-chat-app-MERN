import axiosInstance from "../interceptors/jwtInterceptor";

class MessageService {
  // Send a message to a user
  async createMessage(userToChatUserId, formdata) {
    try {
      const response = await axiosInstance.post(
        `/message/${userToChatUserId}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating message", error);
      throw error;
    }
  }

  // get messages
  async getMessages(userToChatUserId) {
    try {
      const response = await axiosInstance.get(`/message/${userToChatUserId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting messages", error);
      throw error;
    }
  }

  // delete messages
  async deleteMessages(userToChatUserId, messageIds) {
    const messageIdsString = JSON.stringify(messageIds);
    try {
      const response = await axiosInstance.delete(
        `/message/${userToChatUserId}/${messageIdsString}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting messages", error);
      throw error;
    }
  }
}

export default new MessageService();
