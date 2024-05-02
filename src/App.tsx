import React, { useRef, useEffect, useState } from 'react';


const Participant: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center mb-2">
    <div className="w-8 h-8 bg-gray-400 rounded-full mr-2"></div>
    <div>{name}</div>
  </div>
);

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStream(stream);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };
    getMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const handleEnableCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        if (stream) {
          stream.getTracks().forEach(track => {
            track.stop();
          });
        }
        setStream(newStream);
      }
    } catch (err) {
      console.error('Error enabling camera:', err);
    }
  };

  const handleDisableCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none bg-blue-500 text-white py-4 px-6">
        System Camara 
      </div>
      <div className="flex-1 flex">
        <div className="flex-none bg-gray-200 p-4 w-1/4">
          <h2 className="text-lg font-semibold mb-2">Participants</h2>
          <Participant name="Participant 1" />
          <Participant name="Participant 2" />
          <Participant name="Participant 3" />
        </div>
        <div className="flex-1 bg-gray-300 p-4 relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src=""
            controls
            autoPlay
            playsInline
          ></video>
          <div className="absolute bottom-0 right-0 bg-black text-white p-2 m-4 rounded-lg opacity-75">
            You
          </div>
          <div className="absolute top-0 right-0 m-4">
            <button
              onClick={handleEnableCamera}
              className="w-10 h-10 bg-green-500 text-white rounded-full p-2"
            >
              ON
            </button>
            <button
              onClick={handleDisableCamera}
              className="w-10 h-10 bg-red-500 text-white rounded-full p-2 ml-2"
            >
              OFF
            </button>
          </div>
        </div>
      </div>
      <div className="flex-none bg-gray-200 p-4">Chat Box</div>
    </div>
  );
};

export default App;