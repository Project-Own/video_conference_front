/**
 *
 * Returns Devices available for taking input/output for specified device kind.
 * */
export const getAvailableMediaDevices = async (
  deviceType: MediaDeviceKind,
  setDevices: (devices: MediaDeviceInfo[] | null) => void
) => {
  const tracks = await getMediaTracks({ audio: true, video: true }, () => {
    // console.log("Opening now");
  });
  closeMediaTracks(tracks!, () => {
    // console.log("closing NOw");
  });
  const devices = await navigator.mediaDevices
    .enumerateDevices()
    .catch((err) => console.log(err));

  if (devices) {
    const deviceArr = devices.filter(
      (device: MediaDeviceInfo) => device.kind === deviceType
    );

    setDevices(deviceArr);
    return deviceArr;
  }
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
export type MediaDeviceName = "Audio" | "Video" | "Screen Share" | "Speaker";
export const handleMediaDeviceToggle = (
  deviceName: MediaDeviceName,
  isDeviceOn: boolean,
  setIsDeviceOn: (value: boolean) => void
) => {
  if (!isDeviceOn) {
    setIsDeviceOn(true);
    console.log(`${deviceName} On`);
  } else {
    setIsDeviceOn(false);
    console.log(`${deviceName} Off`);
  }
};

/**
 *
 * */
export const getMediaTracks = async (
  requestedMedia: MediaStreamConstraints,
  setTracks: (tracks: MediaStreamTrack[] | null) => void
) => {
  try {
    const tracks = await navigator.mediaDevices
      .getUserMedia(requestedMedia)
      .catch((e) => {
        console.log(e);
      })
      .then((stream) => {
        const tracks = stream ? stream.getTracks() : [];
        if (tracks.length > 0) {
          setTracks(tracks);
        } else {
          console.log("Cannot Use UserMedia");
        }
        return tracks;
      });
    return tracks;
  } catch (err) {
    console.log(err);
  }
};
/**
 *
 * */
export const getDisplayMediaTracks = async (
  requestedMedia: MediaStreamConstraints,
  setTracks: (tracks: MediaStreamTrack[] | null) => void
) => {
  try {
    const tracks = await navigator.mediaDevices
      .getDisplayMedia(requestedMedia)
      .catch((e) => {
        console.log(e);
      })
      .then((stream) => {
        const tracks = stream ? stream.getTracks() : [];
        if (tracks.length > 0) {
          setTracks(tracks);
        } else {
          console.log("Cannot Use UserMedia");
        }
        return tracks;
      });
    return tracks;
  } catch (err) {
    console.log(err);
  }
};
/**
 *
 * */
// export const getDisplayMedia = async (
//   requestedMedia: MediaStreamConstraints,
//   setTracks: (tracks: MediaStreamTrack[] | null) => void
// ) => {
//   // try {
//   //   navigator.ge;
//   //   const stream = await navigator.mediaDevices.get(requestedMedia);
//   //   const tracks = stream.getTracks();
//   //   if (tracks.length > 0) console.log(`Using tracks device: ${tracks[0].label}`);
//   //   setTracks(tracks);
//   // } catch (err) {
//   //   console.log(err);
//   // }
// };
