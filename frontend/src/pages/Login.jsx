import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, Card, Typography, Row, Col, Avatar, Space, Alert } from 'antd';
import { BookOutlined, StarOutlined, BarChartOutlined, MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const onFinish = async (values) => {
    setError('');
    setLoading(true);

    const result = await login(values.email, values.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const features = [
    {
      icon: BookOutlined,
      title: 'Smart Library Management',
      description: 'Organize and track your entire reading collection',
      color: '#8FABD4'
    },
    {
      icon: StarOutlined,
      title: 'AI Recommendations',
      description: 'Discover your next favorite book with smart suggestions',
      color: '#8FABD4'
    },
    {
      icon: BarChartOutlined,
      title: 'Reading Analytics',
      description: 'Track progress and achieve your reading goals',
      color: '#8FABD4'
    }
  ];

  return (
    <motion.div 
      className="min-h-screen light-bg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Row className="min-h-screen">
        {/* Left Side - Text Content (Hidden on mobile) */}
        <Col xs={0} lg={12} className="flex items-center justify-center p-12">
          <motion.div variants={itemVariants} className="max-w-lg">
            <Space direction="vertical" size="large" style={{width: '100%'}}>
              <div className="flex items-center mb-8">
                <Avatar 
                  size={64} 
                  style={{backgroundColor: '#4A70A9', borderRadius: 16, marginRight: 16}}
                  icon={<BookOutlined style={{fontSize: 24}} />}
                />
                <div>
                  <Title level={1} className="font-display" style={{color: '#000000', margin: 0}}>
                    BookBuddy
                  </Title>
                  <Text style={{color: '#4A70A9'}}>Your Reading Companion</Text>
                </div>
              </div>
              
              <Title level={2} className="font-display" style={{color: '#000000'}}>
                Welcome Back!
              </Title>
              
              <Text style={{fontSize: '16px', color: '#4A70A9'}}>
                Continue your reading journey with personalized book tracking, 
                AI-powered recommendations, and detailed progress analytics.
              </Text>
              
              <Space direction="vertical" size="middle" style={{width: '100%'}}>
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <Avatar 
                      size={48} 
                      style={{backgroundColor: feature.color, marginRight: 16}}
                      icon={<feature.icon />}
                    />
                    <div>
                      <Title level={5} style={{color: '#000000', margin: 0}}>
                        {feature.title}
                      </Title>
                      <Text style={{color: '#4A70A9', fontSize: '14px'}}>
                        {feature.description}
                      </Text>
                    </div>
                  </motion.div>
                ))}
              </Space>
            </Space>
          </motion.div>
        </Col>

        {/* Right Side - Form Card */}
        <Col xs={24} lg={12} className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <motion.div variants={itemVariants} className="w-full max-w-lg">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <Space>
                <Avatar 
                  size={48} 
                  style={{backgroundColor: '#4A70A9', borderRadius: 12}}
                  icon={<BookOutlined />}
                />
                <Title level={2} className="font-display" style={{color: '#000000', margin: 0}}>
                  BookBuddy
                </Title>
              </Space>
            </div>

            <Card
              style={{
                borderColor: '#8FABD4',
                borderWidth: 2,
                borderRadius: 20,
                boxShadow: '0 10px 30px rgba(74, 112, 169, 0.15)'
              }}
            >
              <div className="text-center mb-8">
                <Title level={2} className="font-display" style={{color: '#000000'}}>
                  Sign In
                </Title>
                <Text style={{color: '#4A70A9', fontSize: '16px'}}>
                  Access your personal reading dashboard
                </Text>
              </div>

              <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                size="large"
              >
                {error && (
                  <Alert
                    message={error}
                    type="error"
                    showIcon
                    style={{marginBottom: 24}}
                  />
                )}
                
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{color: '#8FABD4'}} />}
                    placeholder="Enter your email address"
                    style={{
                      borderColor: '#8FABD4',
                      borderRadius: 12,
                      padding: '12px 16px'
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{color: '#8FABD4'}} />}
                    placeholder="Enter your password"
                    style={{
                      borderColor: '#8FABD4',
                      borderRadius: 12,
                      padding: '12px 16px'
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{
                      backgroundColor: '#4A70A9',
                      borderColor: '#4A70A9',
                      borderRadius: 8,
                      height: 48,
                      fontSize: '16px'
                    }}
                  >
                    {loading ? 'Signing you in...' : 'Sign In to BookBuddy'}
                  </Button>
                </Form.Item>

                <div className="text-center pt-6">
                  <Text style={{color: '#4A70A9', fontSize: '16px'}}>
                    New to BookBuddy?{' '}
                    <Link 
                      to="/signup" 
                      style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                      }}
                    >
                      Create your account →
                    </Link>
                  </Text>
                </div>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Login;