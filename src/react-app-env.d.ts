/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly TURN_URL_1: string;
    readonly TURN_CREDENTIAL_1: string;
    readonly TURN_USERNAME_1: string;

    readonly TURN_URL_2: string;
    readonly TURN_CREDENTIAL_2: string;
    readonly TURN_USERNAME_2: string;

    readonly TURN_URL_3: string;
    readonly TURN_CREDENTIAL_3: string;
    readonly TURN_USERNAME_3: string;
  }
}
