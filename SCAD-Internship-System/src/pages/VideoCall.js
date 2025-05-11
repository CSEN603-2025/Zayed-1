import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { 
  FaVideo, 
  FaVideoSlash, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaDesktop, 
  FaPhoneSlash,
  FaUser,
  FaBell,
  FaTimes,
  FaCheck,
  FaCircle
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  height: calc(100vh - 64px); // Subtract navbar height
  display: flex;
  flex-direction: column;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
  flex: 1;
  margin-bottom: 1rem;
  min-height: 0; // Important for grid to work with flex
`;

const VideoBox = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoLabel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${props => {
    if (props.variant === 'danger') return '#dc3545';
    if (props.variant === 'success') return '#28a745';
    return props.active ? '#4a4a4a' : '#3a3a3a';
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: ${props => {
      if (props.variant === 'danger') return '#c82333';
      if (props.variant === 'success') return '#218838';
      return props.active ? '#5a5a5a' : '#4a4a4a';
    }};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${props => props.online ? '#e8f5e9' : '#f5f5f5'};
  color: ${props => props.online ? '#2e7d32' : '#757575'};
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.online ? '#4caf50' : '#9e9e9e'};
    animation: ${props => props.online ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const NotificationBanner = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  
  svg {
    margin-right: 0.5rem;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ScreenShareOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ScreenShareControls = styled.div`
  background-color: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScreenShareOption = styled.button`
  background-color: #3a3a3a;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #4a4a4a;
  }
`;

const VideoCall = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showScreenShareOptions, setShowScreenShareOptions] = useState(false);
  const [notification, setNotification] = useState(null);
  const [participantLeft, setParticipantLeft] = useState(false);
  const [isOtherUserOnline, setIsOtherUserOnline] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // Simulate other user's online status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change online status for demo purposes
      // In a real app, this would be based on actual user presence
      const newStatus = Math.random() > 0.7;
      if (newStatus !== isOtherUserOnline) {
        setIsOtherUserOnline(newStatus);
        if (!newStatus) {
          setNotificationMessage('The other participant has gone offline');
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
        } else {
          setNotificationMessage('The other participant is back online');
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
        }
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [isOtherUserOnline]);
  
  // Simulate other user leaving the call
  useEffect(() => {
    const timeout = setTimeout(() => {
      // In a real app, this would be triggered by the other user actually leaving
      setNotificationMessage('The other participant has left the call');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        // Optionally navigate away after notification
        // navigate('/career-guidance');
      }, 5000);
    }, 30000); // Demo: other user leaves after 30 seconds
    
    return () => clearTimeout(timeout);
  }, []);
  
  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // In a real app, this would toggle the video stream
  };
  
  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // In a real app, this would toggle the audio stream
  };
  
  const handleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // In a real app, this would use the Screen Capture API
        // const stream = await navigator.mediaDevices.getDisplayMedia();
        setShowScreenShareOptions(true);
      } else {
        // Stop screen sharing
        setIsScreenSharing(false);
        setNotification({
          type: 'success',
          message: 'Screen sharing stopped'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to start screen sharing'
      });
    }
  };
  
  const handleEndCall = () => {
    // In a real app, this would clean up media streams and close the connection
    navigate('/career-guidance');
  };
  
  const handleScreenShareOption = (option) => {
    setIsScreenSharing(true);
    setShowScreenShareOptions(false);
    setNotification({
      type: 'success',
      message: `Sharing ${option}`
    });
  };
  
  return (
    <PageContainer>
      <Navbar userType="proStudent" />
      
      <ContentContainer>
        <StatusIndicator online={isOtherUserOnline}>
          <FaCircle />
          {isOtherUserOnline ? 'Other participant is online' : 'Other participant is offline'}
        </StatusIndicator>
        
        <VideoGrid>
          <VideoBox>
            <video ref={localVideoRef} autoPlay muted playsInline />
            <VideoLabel>
              <FaUser />
              You (Local)
            </VideoLabel>
          </VideoBox>
          
          <VideoBox>
            <video ref={remoteVideoRef} autoPlay playsInline />
            <VideoLabel>
              <FaUser />
              SCAD Advisor
            </VideoLabel>
          </VideoBox>
        </VideoGrid>
        
        <ControlsContainer>
          <ControlButton 
            active={isVideoEnabled}
            onClick={handleToggleVideo}
            title={isVideoEnabled ? 'Disable video' : 'Enable video'}
          >
            {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
          </ControlButton>
          
          <ControlButton 
            active={isAudioEnabled}
            onClick={handleToggleAudio}
            title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </ControlButton>
          
          <ControlButton 
            active={isScreenSharing}
            onClick={handleScreenShare}
            title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
          >
            <FaDesktop />
          </ControlButton>
          
          <ControlButton 
            variant="danger"
            onClick={handleEndCall}
            title="End call"
          >
            <FaPhoneSlash />
          </ControlButton>
        </ControlsContainer>
        
        {notification && (
          <NotificationBanner type={notification.type}>
            {notification.type === 'error' ? <FaTimes /> : <FaCheck />}
            {notification.message}
          </NotificationBanner>
        )}
        
        {showScreenShareOptions && (
          <ScreenShareOverlay>
            <ScreenShareControls>
              <ScreenShareOption onClick={() => handleScreenShareOption('entire screen')}>
                <FaDesktop />
                Share entire screen
              </ScreenShareOption>
              <ScreenShareOption onClick={() => handleScreenShareOption('application window')}>
                <FaDesktop />
                Share application window
              </ScreenShareOption>
              <ScreenShareOption onClick={() => handleScreenShareOption('browser tab')}>
                <FaDesktop />
                Share browser tab
              </ScreenShareOption>
              <ScreenShareOption onClick={() => setShowScreenShareOptions(false)}>
                <FaTimes />
                Cancel
              </ScreenShareOption>
            </ScreenShareControls>
          </ScreenShareOverlay>
        )}
        
        {showNotification && (
          <NotificationBanner>
            <FaBell />
            {notificationMessage}
          </NotificationBanner>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default VideoCall; 