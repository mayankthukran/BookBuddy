import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography } from 'antd';
import { BookOutlined, MenuOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = user ? [
    { key: '/', label: 'Home' },
    { key: '/my-books', label: 'My Books' },
    { key: '/recommendations', label: 'Recommendations' },
    { key: '/dashboard', label: 'Dashboard' },
  ] : [
    { key: '/', label: 'Home' },
    { key: '/login', label: 'Login' },
    { key: '/signup', label: 'Register' },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AntHeader 
        style={{
          backgroundColor: 'white',
          borderBottom: '2px solid #E5E7EB',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '0 24px'
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Avatar 
              size={40} 
              style={{backgroundColor: '#4A70A9', borderRadius: 12}}
              icon={<BookOutlined />}
            />
            <Title 
              level={2} 
              className="font-display"
              style={{color: '#000000', margin: 0}}
            >
              BookBuddy
            </Title>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '16px'
              }}
              items={navItems.map(item => ({
                ...item,
                label: <Link to={item.key}>{item.label}</Link>
              }))}
            />
            
            {user && (
              <Space>
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                >
                  <Button 
                    type="text" 
                    style={{padding: 0}}
                  >
                    {user.profileImage ? (
                      <Avatar 
                        src={user.profileImage} 
                        alt={user.name}
                        size={32}
                      />
                    ) : (
                      <Avatar 
                        style={{backgroundColor: '#4A70A9'}}
                        size={32}
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                  </Button>
                </Dropdown>
              </Space>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Dropdown
              menu={{
                items: [
                  ...navItems.map(item => ({
                    ...item,
                    onClick: () => navigate(item.key)
                  })),
                  ...(user ? userMenuItems : [])
                ]
              }}
              placement="bottomRight"
            >
              <Button 
                type="text" 
                icon={<MenuOutlined />}
                style={{color: '#000000'}}
              />
            </Dropdown>
          </div>
        </div>
      </AntHeader>
    </motion.div>
  );
};

export default Header;