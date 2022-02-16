export interface HTMLCanvasElementWithCaptureStream extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

interface StreamOptions {
  height: number;
  width: number;
  frameRate: number;
}
export default class StreamMerger {
  _streamVideoElements: HTMLVideoElement[] = [];
  _streamCanvasElements: HTMLCanvasElement[] = [];
  _streamAudioTracks: MediaStreamTrack[] = [];
  result: MediaStream | null = null;
  _canvas: HTMLCanvasElementWithCaptureStream | null = null;
  _ctx: CanvasRenderingContext2D | null = null;
  _props: StreamOptions;

  constructor(props: StreamOptions) {
    this._props = props;
  }

  _draw = () => {
    try {
      const { height, width } = this._props;

      requestAnimationFrame(this._draw);

      this._streamVideoElements.forEach((streamEl) => {
        this._ctx?.drawImage(streamEl, 0, 0, width, height);
      });

      this._streamCanvasElements.forEach((streamEl) => {
        this._ctx?.drawImage(streamEl, 0, 0, width, height);
      });
    } catch (error) {
      console.log(error);
    }
  };

  start = () => {
    this._canvas = document.createElement("canvas");
    this._canvas.height = this._props.height;
    this._canvas.width = this._props.width;
    this._ctx = this._canvas.getContext("2d");

    this._draw();

    if (this._canvas.captureStream) {
      this.result = this._canvas.captureStream(
        this._props.frameRate
      ) as MediaStream;
    } else {
      throw new Error("Canvas Capture Stream not supported");
    }
    this._streamAudioTracks.map((track) => this.result?.addTrack(track));
  };

  stop = () => {
    this._canvas = null;
    this._ctx = null;

    this.result = null;
    this._streamCanvasElements = [];
    this._streamVideoElements = [];
  };

  addStream = (stream: MediaStream) => {
    const hasVideo = stream.getVideoTracks().length > 0;
    const hasAudio = stream.getAudioTracks().length > 0;

    if (hasVideo) {
      const videoEl = document.createElement("video");
      videoEl.srcObject = stream;
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      videoEl.setAttribute("style", " pointer-events: none; opacity:0;");
      videoEl.muted = true;
      videoEl.oncanplaythrough = () => {
        videoEl.play().catch((e) => {
          console.log(e);
        });
      };

      this._streamVideoElements.push(videoEl);
    }

    if (hasAudio) {
      this.result?.addTrack(stream.getAudioTracks()[0]);
    }

    // if (hasAudio)
    //   stream.getAudioTracks().forEach((track) => this.result?.addTrack(track));
  };
  addAudio = (stream: MediaStream) => {
    const hasAudio = stream.getAudioTracks().length > 0;
    if (hasAudio) {
      this._streamAudioTracks.concat(stream.getAudioTracks());
    }
  };

  addAudioTrack = (track: MediaStreamTrack) => {
    this._streamAudioTracks.push(track);
  };
  addCanvas = (canvasEl: HTMLCanvasElement) => {
    this._streamCanvasElements.push(canvasEl);
  };

  addVideo = (videoEl: HTMLVideoElement) => {
    this._streamVideoElements.push(videoEl);
  };

  cleanupAudioTracks = () => {
    this.result
      ?.getAudioTracks()
      .forEach((track) => this.result?.removeTrack(track));
  };
  // Todo
  removeStream = (stream: MediaStream) => {
    // const hasVideo = stream.getVideoTracks().length > 0;
    const hasAudio = stream.getAudioTracks().length > 0;

    if (hasAudio)
      stream
        .getAudioTracks()
        .forEach((track) => this.result?.removeTrack(track));
  };
}
