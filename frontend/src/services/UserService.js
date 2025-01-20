import axiosInstance from "../interceptors/jwtInterceptor";

class UserService {
  // get profile
  async getProfile(userId) {
    try {
      const response = await axiosInstance.get(`/user/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting profile", error);
      throw error;
    }
  }

  // get users
  async getUsers() {
    try {
      const response = await axiosInstance.get("/user/users");
      return response.data;
    } catch (error) {
      console.error("Error getting users", error);
      throw error;
    }
  }

  // update profile picture
  async updateProfilePicture(formdata) {
    try {
      const response = await axiosInstance.put("/user/update-dp", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile picture", error);
      throw error;
    }
  }

  // update profile info
  async updateProfileInfo(userInfo) {
    try {
      const response = await axiosInstance.put("/user/update-info", userInfo);
      return response.data;
    } catch (error) {
      console.error("Error updating profile info", error);
      throw error;
    }
  }
}

export default new UserService();
