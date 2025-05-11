import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaBell, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaTimesCircle,
  FaTimes
} from 'react-icons/fa';

const NotificationContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  width: 350px;
  max-width: 90vw;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background-color: ${props => {
    switch(props.type) {
      case 'success': return '#d4edda';
      case 'error': return '#f8d7da';
      case 'warning': return '#fff3cd';
      case 'info': return '#d1ecf1';
      default: return 'white';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'warning': return '#856404';
      case 'info': return '#0c5460';
      default: return '#333333';
    }
  }};
  animation: slideIn 0.3s ease-out;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => props.exiting ? 0 : 1};
  transform: ${props => props.exiting ? 'translateX(100%)' : 'translateX(0)'};

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

const IconContainer = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;

const Message = styled.div`
  font-size: 0.9rem;
`;

const Time = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 5px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  padding: 0;
  font-size: 14px;
  
  &:hover {
    opacity: 1;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BellButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 22px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.tertiary};
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 1001;
  border: 1px solid ${props => props.theme.colors.tertiary};
`;

const DropdownHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DropdownContent = styled.div`
  max-height: 350px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const DropdownItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const DropdownItemTitle = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const DropdownItemTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`;

const DropdownItemMessage = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyState = styled.div`
  padding: 30px;
  text-align: center;
  color: ${props => props.theme.colors.darkGray};
`;

const getNotificationIcon = (type) => {
  switch(type) {
    case 'success': return <FaCheckCircle />;
    case 'error': return <FaTimesCircle />;
    case 'warning': return <FaExclamationCircle />;
    case 'info': return <FaInfoCircle />;
    default: return <FaBell />;
  }
};

const formatTime = (time) => {
  if (!time) return '';
  
  const now = new Date();
  const notificationTime = new Date(time);
  const diffInMs = now - notificationTime;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else {
    return notificationTime.toLocaleDateString();
  }
};

// Toast Notification Component
const ToastNotification = ({ id, title, message, type, time, onClose }) => {
  const [exiting, setExiting] = useState(false);
  
  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  return (
    <NotificationItem type={type} exiting={exiting}>
      <IconContainer>
        {getNotificationIcon(type)}
      </IconContainer>
      <ContentContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
        {time && <Time>{formatTime(time)}</Time>}
      </ContentContainer>
      <CloseButton onClick={handleClose}>
        <FaTimes />
      </CloseButton>
    </NotificationItem>
  );
};

// Notification List Component
const NotificationList = ({ notifications, onClearAll, onReadNotification }) => {
  return (
    <>
      <DropdownHeader>
        <DropdownTitle>Notifications</DropdownTitle>
        {notifications.length > 0 && (
          <ClearAllButton onClick={onClearAll}>Clear All</ClearAllButton>
        )}
      </DropdownHeader>
      <DropdownContent>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <DropdownItem 
              key={notification.id} 
              onClick={() => onReadNotification(notification.id)}
            >
              <DropdownItemHeader>
                <DropdownItemTitle>{notification.title}</DropdownItemTitle>
                <DropdownItemTime>{formatTime(notification.time)}</DropdownItemTime>
              </DropdownItemHeader>
              <DropdownItemMessage>{notification.message}</DropdownItemMessage>
            </DropdownItem>
          ))
        ) : (
          <EmptyState>
            <FaBell size={24} style={{ opacity: 0.5, marginBottom: '10px' }} />
            <p>No notifications yet</p>
          </EmptyState>
        )}
      </DropdownContent>
    </>
  );
};

// Main Notification Center Component
const NotificationCenter = ({ userType = 'student' }) => {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Example notifications - In a real app, these would come from an API or context
  useEffect(() => {
    // Simulate fetching notifications
    const mockNotifications = [
      // Company notifications for internship applications
      {
        id: 1,
        title: 'New Application Received',
        message: 'John Smith has applied for the Frontend Developer Intern position.',
        type: 'info',
        time: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
        read: false,
        userType: 'company'
      },
      {
        id: 2,
        title: 'New Application Received',
        message: 'Sarah Johnson has applied for the Frontend Developer Intern position.',
        type: 'info',
        time: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
        read: false,
        userType: 'company'
      },
      {
        id: 3,
        title: 'New Application Received',
        message: 'Michael Brown has applied for the UI/UX Design Intern position.',
        type: 'info',
        time: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
        read: true,
        userType: 'company'
      },
      
      // Student notifications for report status changes
      {
        id: 4,
        title: 'Report Status Updated',
        message: 'Your January monthly report has been approved by your supervisor.',
        type: 'success',
        time: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
        read: false,
        userType: 'student' 
      },
      {
        id: 5,
        title: 'Report Status Updated',
        message: 'Your February monthly report requires revisions. Please check the comments.',
        type: 'warning',
        time: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
        read: false,
        userType: 'student'
      },
      {
        id: 6,
        title: 'Report Status Updated',
        message: 'Your final internship report has been approved. Congratulations on completing your internship!',
        type: 'success',
        time: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
        read: true,
        userType: 'student'
      },
      {
        id: 7,
        title: 'New internship cycle begins',
        message: 'A new internship cycle begins. Please submit your application before the deadline.',
        type: 'success',
        time: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
        read: false,
        userType: 'student' 
      },
      
      // SCAD Office notifications
      {
        id: 8,
        title: 'Incoming Call Notification',
        message: 'Pro Student Ahmed has requested a workshop call about UI/UX internship opportunities.',
        type: 'info',
        time: new Date(Date.now() - 40 * 60000).toISOString(), // 40 minutes ago
        read: false,
        userType: 'scadOffice'
      },
      {
        id: 9,
        title: 'Incoming Call Notification',
        message: 'Pro Student Sara has requested a call about internship application process.',
        type: 'info',
        time: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
        read: false,
        userType: 'scadOffice'
      },
      {
        id: 10,
        title: 'Appointment Scheduled',
        message: 'Your appointment with Pro Student Mohamed has been confirmed for tomorrow at 2:00 PM.',
        type: 'success',
        time: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
        read: false,
        userType: 'scadOffice'
      },
      
      // Pro Student notifications
      {
        id: 11,
        title: 'Call Request Status',
        message: 'Your call request about UI/UX internship opportunities has been received by the SCAD Office.',
        type: 'info',
        time: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
        read: false,
        userType: 'proStudent'
      },
      {
        id: 12,
        title: 'Appointment Confirmed',
        message: 'Your appointment with SCAD Officer Dr. Ali has been confirmed for tomorrow at 2:00 PM.',
        type: 'success',
        time: new Date(Date.now() - 1 * 3600000).toISOString(), // 1 hour ago
        read: false,
        userType: 'proStudent'
      },
      {
        id: 13,
        title: 'Workshop Call Accepted',
        message: 'SCAD Officer Dr. Fatima has accepted your workshop call request. The call is scheduled for Friday at 11:00 AM.',
        type: 'success',
        time: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
        read: false,
        userType: 'proStudent'
      }
    ];
    
    // Filter notifications based on user type
    // Make sure both 'student' and 'proStudent' receive student notifications
    const filteredNotifications = mockNotifications.filter(
      notification => {
        if ((userType === 'student' || userType === 'proStudent') && notification.userType === 'student') {
          return true;
        }
        return notification.userType === userType;
      }
    );
    
    setNotifications(filteredNotifications);
  }, [userType]);
  
  // Add a new toast notification
  const addToast = (notification) => {
    const newToast = {
      id: Date.now(),
      ...notification,
      time: new Date().toISOString()
    };
    
    setToasts(prev => [...prev, newToast]);
  };
  
  // Remove a toast notification
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setShowDropdown(false);
  };
  
  // Mark a notification as read and handle any actions
  const handleReadNotification = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    
    // Handle specific actions based on notification type
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      if (notification.type === 'success') {
        // Show a toast to confirm the notification was seen
        addToast({
          title: 'Notification marked as read',
          message: `You've read: ${notification.title}`,
          type: 'success'
        });
      }
      
      // Close the dropdown
      setShowDropdown(false);
    }
  };
  
  // Toggle the notification dropdown
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };
  
  // Example of how to add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      time: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Optionally show a toast for important notifications
    if (['success', 'error', 'warning'].includes(notification.type)) {
      addToast(notification);
    }
  };
  
  // Demo function to trigger notifications (for testing)
  const triggerDemoNotification = () => {
    if (userType === 'company') {
      addNotification({
        title: 'New Application Received',
        message: 'Alex Johnson has just applied for the Backend Developer Intern position.',
        type: 'info',
        userType: 'company'
      });
    } else if (userType === 'student' || userType === 'proStudent') {
      addNotification({
        title: 'Report Status Updated',
        message: 'Your March monthly report has been reviewed. Click to view comments.',
        type: 'success',
        userType: 'student'
      });
      addNotification({
        title: 'New internship cycle begins',
        message: 'A new internship cycle begins. Please submit your application before the deadline.',
        type: 'success',
        userType: 'student'
      });
    } else if (userType === 'scadOffice') {
      addNotification({
        title: 'Incoming Call Notification',
        message: 'Pro Student Khalid has requested a workshop call about internship opportunities in finance.',
        type: 'info',
        userType: 'scadOffice'
      });
    } else if (userType === 'proStudent') {
      addNotification({
        title: 'Appointment Confirmed',
        message: 'Your appointment with SCAD Officer Dr. Ahmed has been confirmed for tomorrow at 3:30 PM.',
        type: 'success',
        userType: 'proStudent'
      });
    }
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <>
      {/* Toast Notifications */}
      <NotificationContainer>
        {toasts.map(toast => (
          <ToastNotification
            key={toast.id}
            id={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            time={toast.time}
            onClose={removeToast}
          />
        ))}
      </NotificationContainer>
      
      {/* Notification Bell & Dropdown */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BellButton onClick={toggleDropdown}>
            <FaBell />
            {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </BellButton>
          
          {/* Demo button to trigger new notifications (for testing only) */}
          <button 
            onClick={triggerDemoNotification}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#666', 
              marginLeft: '10px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Test
          </button>
        </div>
        
        <DropdownContainer show={showDropdown}>
          <NotificationList
            notifications={notifications}
            onClearAll={clearAllNotifications}
            onReadNotification={handleReadNotification}
          />
        </DropdownContainer>
      </div>
    </>
  );
};

export default NotificationCenter; 