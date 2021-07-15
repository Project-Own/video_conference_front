import { EnvironmentVariables } from "./../config/environmentVariable";
import { HTMLCanvasElementWithCaptureStream } from "./StreamMerger";
export const addURLPath = (url: string): string => {
  return `${EnvironmentVariables.publicURL}${url}`;
};

/**
 * Black Silence (Dummy Stream)
 * */
const _silence = () => {
  let ctx = new AudioContext(),
    oscillator = ctx.createOscillator();

  let audioDestination = ctx.createMediaStreamDestination();
  oscillator.connect(audioDestination);
  oscillator.start();

  return Object.assign(audioDestination.stream.getAudioTracks()[0], {
    enabled: false,
  });
};
interface props {
  width: number;
  height: number;
}
const _black = ({ width = 640, height = 480 }: props) => {
  let canvas: HTMLCanvasElementWithCaptureStream = Object.assign(
    document.createElement("canvas"),
    {
      width,
      height,
    }
  );
  canvas?.getContext("2d")?.fillRect(0, 0, width, height);

  let stream: MediaStream | null = null;
  if (canvas.captureStream) {
    stream = canvas?.captureStream();
  }
  return Object.assign(stream?.getVideoTracks()[0], { enabled: false });
};
// Dummy mediaStream
export const blackSilence = (props?: props) =>
  new MediaStream([_black({ ...props! }), _silence()]);

export enum SocketEvent {
  created = "created",
  joined = "joined",
  join = "join",
  full = "full",
  ready = "ready",
  candidate = "candidate",
  offer = "offer",
  answer = "answer",
}
