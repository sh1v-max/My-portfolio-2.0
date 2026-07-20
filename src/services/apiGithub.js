import axios from "axios";
import { personal } from "../data/config";

const API_USER_URL = `https://api.github.com/users/${personal.githubUsername}`;
const API_REPOS_URL = `https://api.github.com/users/${personal.githubUsername}/repos?per_page=100`;

export async function getUser() {
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(API_USER_URL),
      axios.get(API_REPOS_URL),
    ]);

    return {
      user: userRes.data,
      repos: reposRes.data,
    };
  } catch (error) {
    throw new Error("Failed to fetch GitHub data");
  }
}
