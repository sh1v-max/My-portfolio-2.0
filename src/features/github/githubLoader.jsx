import { getUser } from "../../services/apiGithub";

export async function githubLoader() {
  return await getUser();
}