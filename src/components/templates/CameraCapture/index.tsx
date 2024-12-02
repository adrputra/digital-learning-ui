/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from 'react';

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // Use ref to store the stream

  // Open the camera when the component mounts
  useEffect(() => {
    const openCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = mediaStream; // Store the stream in a ref
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };
    openCamera();

    // Cleanup when the component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all camera tracks
      }
    };
  }, []);

  // Capture the image when space is pressed
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        captureImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to the canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImageSrc(dataUrl); // Save the captured image as a data URL
      }
    }
  };

  return (
    <div>
      <h1>Camera Capture</h1>
      <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '500px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <p>
        Press the <strong>Space</strong> key to capture an image.
      </p>

      {imageSrc && (
        <div>
          <h2>Captured Image:</h2>
          <img src={imageSrc} alt="Captured" style={{ width: '100%', maxWidth: '500px' }} />
        </div>
      )}
    </div>
  );
}
