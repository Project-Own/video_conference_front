import { useContext, useEffect, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
} from "./../utils/media.utils";

export const useAudio = () => {
  const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[] | null>(
    null
  );
  // const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[] | null>(
  //   null
  // );

  const DEFAULT_AUDIO_CONSTRAINTS = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: false,
    },
  };

  // const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const {
    microphone,
    microphoneDeviceId,
    stream,
    setMicrophoneDeviceId,
    setStream,
    setMicrophoneDevices,
  } = useContext(ConferenceContext);

  const stopAudioTracks = () => {
    if (audioTracks) stream?.removeTrack(audioTracks[0]);

    closeMediaTracks(audioTracks, setAudioTracks);
  };

  const startAudioTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    mediaTrackConstraint = DEFAULT_AUDIO_CONSTRAINTS.audio;

    if (mediaTrackConstraint) {
      mediaTrackConstraint.deviceId = microphoneDeviceId;
      getMediaTracks({ audio: mediaTrackConstraint }, setAudioTracks);
    }
  };

  useEffect(() => {
    getAvailableMediaDevices("audioinput", (devices) =>
      setMicrophoneDevices(devices!)
    ).then((devices) => {
      if (devices) {
        if (devices[0].deviceId !== "")
          setMicrophoneDeviceId(devices[0].deviceId);
      }
    });

    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!microphone || !microphoneDeviceId) {
      stopAudioTracks();
      return stopAudioTracks;
    }
    // if (isFirefox) {
    startAudioTracks();
    // } else {
    // navigator.permissions
    //   .query({ name: "microphone" })
    //   .then((result) => {
    //     if (result.state === "denied") {
    //       alert(
    //         "Microphone will not function when microphone Permission is denied."
    //       );
    //       toggleMicrophone();
    //     } else if (result.state === "granted") {
    //       startAudioTracks();
    //     }
    //   })
    //   .catch((e) => console.log(e));
    // // }
    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphone, microphoneDeviceId]);

  useEffect(() => {
    console.log("Microphone Toggled", microphone);
    if (!microphone) {
      stopAudioTracks();
      return stopAudioTracks;
    }
    startAudioTracks();

    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphone]);

  useEffect(() => {}, [audioTracks]);

  useEffect(() => {
    if (!audioTracks) {
      return;
    }

    if (
      stream &&
      stream.getVideoTracks() &&
      stream.getVideoTracks().length > 0
    ) {
      setStream(new MediaStream([audioTracks[0], stream.getVideoTracks()[0]]));
      return;
    }
    setStream(new MediaStream(audioTracks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioTracks]);
};
