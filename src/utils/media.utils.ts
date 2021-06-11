import { Logger } from "./logger";
/**
 *
 * Returns Devices available for taking input/output for specified device kind.
 * */
export const getAvailableMediaDevices = async (
  deviceType: MediaDeviceKind,
  setDevices: (devices: MediaDeviceInfo[] | null) => void
) => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  if (devices) Logger(`enumerateDevices not supported`);

  setDevices(
    devices.filter((device: MediaDeviceInfo) => device.kind === deviceType)
  );
};
/**
 * Closes Tracks and setTracks state to null
 * Here Tracks are MediaStreamTracks which may contain tracks such as
 * VideoTrack, AudioTrack or ScreenShareTrack
 * */
export const closeMediaTracks = (
  tracks: MediaStreamTrack[] | null,
  setTracks: (tracks: MediaStreamTrack[] | null) => void
) => {
  if (tracks) {
    tracks?.forEach((track) => track.stop());

    setTracks(null);
  }
};

/**
 * Handle_*_Toggle Operation toggles the state of specified component
 * Is_*_Playing state stores the operational status of audio/video.
 * When audio or video is ready to play, this state is active/true.
 * */
export type MediaDeviceName = "Audio" | "Video" | "Screen Share";

export const handleMediaDeviceToggle = (
  deviceName: MediaDeviceName,
  isDeviceOn: boolean,
  setIsDeviceOn: (value: boolean) => void
) => {
  if (!isDeviceOn) {
    setIsDeviceOn(true);
    Logger(`${deviceName} On`);
  } else {
    setIsDeviceOn(false);
    Logger(`${deviceName} Off`);
  }
};

export const getMediaTracks = async (
  requestedMedia: MediaStreamConstraints,
  setTracks: (tracks: MediaStreamTrack[] | null) => void
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
    const tracks = stream.getTracks();
    if (tracks.length > 0) Logger(`Using tracks device: ${tracks[0].label}`);

    setTracks(tracks);
  } catch (err) {
    Logger(err);
  }
};
export const handleMediaDeviceChange = () => {};
