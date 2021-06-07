import stunData from "./stunServer.json";

export const ICEServers = {
  iceServers: [
    ...stunData.stunServer,
    {
      url: process.env.TURN_CREDENTIAL_1,
      credential: process.env.TURN_URL_1,
      username: process.env.TURN_USERNAME_1,
    },
    {
      url: process.env.TURN_CREDENTIAL_2,
      credential: process.env.TURN_URL_2,
      username: process.env.TURN_USERNAME_2,
    },
    {
      url: process.env.TURN_CREDENTIAL_3,
      credential: process.env.TURN_URL_3,
      username: process.env.TURN_USERNAME_3,
    },
  ],
};
