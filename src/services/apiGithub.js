import axios from "axios";
const API_USER_URL = "https://api.github.com/users/sh1v-max";
const API_REPOS_URL = "https://api.github.com/users/sh1v-max/repos";

export async function getUser() {
  try {
    const responseUser = await axios.get(`${API_USER_URL}`);
    const responseRepos = await axios.get(`${API_REPOS_URL}`);
    // console.log(responseUser.data, responseRepos.data);
    return [responseUser.data, responseRepos.data];
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
