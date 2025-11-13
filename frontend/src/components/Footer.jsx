import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Row, 
  Col, 
  Typography, 
  Space, 
  Divider 
} from 'antd';
import { 
  BookOutlined,
  HeartFilled,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialIcons = [
    { icon: TwitterOutlined, href: '#' },
    { icon: FacebookOutlined, href: '#' },
    { icon: InstagramOutlined, href: '#' },
    { icon: LinkedinOutlined, href: '#' }
  ];

  return (
    <motion.footer 
      className="py-16 px-4 sm:px-6 lg:px-8" 
      style={{backgroundColor: '#000000'}}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <Row gutter={[32, 32]} style={{marginBottom: 48}}>
          {/* Brand Section */}
          <Col xs={24} md={6}>
            <motion.div variants={itemVariants}>
              <Space align="center" style={{marginBottom: 16}}>
                <div 
                  className="h-12 w-12 rounded-xl flex items-center justify-center" 
                  style={{backgroundColor: '#4A70A9'}}
                >
                  <BookOutlined className="text-white text-xl" />
                </div>
                <Title 
                  level={2} 
                  className="font-display" 
                  style={{color: 'white', margin: 0}}
                >
                  BookBuddy
                </Title>
              </Space>
              <Text 
                style={{
                  color: '#9CA3AF', 
                  display: 'block', 
                  marginBottom: 24,
                  lineHeight: 1.6
                }}
              >
                Your personal reading companion. Track progress, discover new books, and connect with fellow readers.
              </Text>
              <Space size="middle">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{backgroundColor: '#4A70A9'}}
                    whileHover={{ scale: 1.1, opacity: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="text-white" />
                  </motion.a>
                ))}
              </Space>
            </motion.div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} md={6}>
            <motion.div variants={itemVariants}>
              <Title level={4} style={{color: 'white', marginBottom: 16}}>
                Quick Links
              </Title>
              <Space direction="vertical" size="middle">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/dashboard', label: 'Dashboard' },
                  { to: '/my-books', label: 'My Books' },
                  { to: '/recommendations', label: 'Recommendations' },
                  { to: '/profile', label: 'Profile' }
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={link.to} 
                      style={{
                        color: '#9CA3AF',
                        textDecoration: 'none',
                        transition: 'color 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </Space>
            </motion.div>
          </Col>

          {/* Account */}
          <Col xs={24} md={6}>
            <motion.div variants={itemVariants}>
              <Title level={4} style={{color: 'white', marginBottom: 16}}>
                Account
              </Title>
              <Space direction="vertical" size="middle">
                {[
                  { to: '/login', label: 'Sign In' },
                  { to: '/signup', label: 'Create Account' },
                  { href: '#', label: 'Privacy Policy' },
                  { href: '#', label: 'Terms of Service' },
                  { href: '#', label: 'Help Center' }
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.to ? (
                      <Link 
                        to={link.to} 
                        style={{
                          color: '#9CA3AF',
                          textDecoration: 'none',
                          transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        style={{
                          color: '#9CA3AF',
                          textDecoration: 'none',
                          transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </Space>
            </motion.div>
          </Col>

          {/* Contact */}
          <Col xs={24} md={6}>
            <motion.div variants={itemVariants}>
              <Title level={4} style={{color: 'white', marginBottom: 16}}>
                Contact Us
              </Title>
              <Space direction="vertical" size="middle">
                <div className="flex items-center space-x-3">
                  <MailOutlined style={{color: '#9CA3AF'}} />
                  <Text style={{color: '#9CA3AF'}}>hello@bookbuddy.com</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneOutlined style={{color: '#9CA3AF'}} />
                  <Text style={{color: '#9CA3AF'}}>+1 (555) 123-4567</Text>
                </div>
                <div className="flex items-start space-x-3">
                  <EnvironmentOutlined style={{color: '#9CA3AF', marginTop: 4}} />
                  <Text style={{color: '#9CA3AF'}}>
                    123 Reading Street<br />Book City, BC 12345
                  </Text>
                </div>
              </Space>
            </motion.div>
          </Col>
        </Row>
        
        {/* Bottom Section */}
        <Divider style={{borderColor: '#374151', margin: '32px 0'}} />
        <motion.div variants={itemVariants}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Text style={{color: '#9CA3AF'}}>
                &copy; 2024 BookBuddy. All rights reserved. Made with{' '}
                <HeartFilled style={{color: '#EF4444', margin: '0 4px'}} />{' '}
                for book lovers worldwide.
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <div className="flex justify-start md:justify-end">
                <Space size="large">
                  {['Privacy', 'Terms', 'Cookies', 'Support'].map((item, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      style={{
                        color: '#9CA3AF',
                        textDecoration: 'none',
                        transition: 'color 0.3s'
                      }}
                      whileHover={{ color: 'white' }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </Space>
              </div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;