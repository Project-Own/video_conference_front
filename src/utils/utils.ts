import { EnvironmentVariables } from "./../config/environmentVariable";
export const addURLPath = (url: string): string => {
  return `${EnvironmentVariables.publicURL}${url}`;
};
