import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Typography, Row, Col, Card, Avatar, Space, Statistic } from 'antd';
import { BookOutlined, StarOutlined, BarChartOutlined, UserOutlined, ArrowRightOutlined, LogoutOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const Home = () => {
  const { user, logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      icon: BookOutlined,
      title: 'Smart Library',
      description: 'Organize and track your entire book collection with ease',
      color: '#8FABD4'
    },
    {
      icon: StarOutlined,
      title: 'AI Recommendations',
      description: 'Discover your next favorite book with personalized suggestions',
      color: '#4A70A9'
    },
    {
      icon: BarChartOutlined,
      title: 'Progress Tracking',
      description: 'Monitor your reading goals and celebrate achievements',
      color: '#8FABD4'
    },
    {
      icon: UserOutlined,
      title: 'Community',
      description: 'Connect with readers and share your favorite discoveries',
      color: '#4A70A9'
    }
  ];

  const stats = [
    { title: '10K+', value: 'Active Readers' },
    { title: '50K+', value: 'Books Tracked' },
    { title: '25K+', value: 'Reviews Written' },
    { title: '98%', value: 'User Satisfaction' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Avid Reader',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      quote: 'BookBuddy has completely transformed my reading habits. I\'ve read more books this year than ever before!'
    },
    {
      name: 'Michael Chen',
      role: 'Book Enthusiast',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      quote: 'The AI recommendations are spot on. I\'ve discovered so many amazing books I never would have found otherwise.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Goal-Oriented Reader',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      quote: 'Love the progress tracking feature. It keeps me motivated to reach my reading goals every month.'
    }
  ];

  return (
    <motion.div 
      className="min-h-screen light-bg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <motion.div variants={itemVariants}>
                <Space direction="vertical" size="large" style={{width: '100%'}}>
                  <div className="flex items-center justify-start">
                    <Avatar 
                      size={64} 
                      style={{backgroundColor: '#4A70A9', borderRadius: 16, marginRight: 16}}
                      icon={<BookOutlined style={{fontSize: 24}} />}
                    />
                    <Title 
                      level={1} 
                      className="font-display"
                      style={{color: '#000000', margin: 0, fontSize: 'clamp(2rem, 5vw, 3.5rem)'}}
                    >
                      BookBuddy
                    </Title>
                  </div>
                  
                  <Title 
                    level={2} 
                    className="font-display"
                    style={{color: '#000000', textAlign: 'left', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'}}
                  >
                    Your Personal Reading Companion
                  </Title>
                  
                  <Text style={{fontSize: '18px', color: '#4A70A9', textAlign: 'left', display: 'block', lineHeight: 1.6}}>
                    Track your reading progress, discover new books, and connect with fellow book lovers in one beautiful platform.
                  </Text>
                  
                  <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                    {user ? (
                      <>
                        <Link to="/dashboard">
                          <Button 
                            type="primary" 
                            size="large"
                            icon={<ArrowRightOutlined />}
                            style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                          >
                            Go to Dashboard
                          </Button>
                        </Link>
                        <Button 
                          size="large"
                          icon={<LogoutOutlined />}
                          onClick={logout}
                          style={{borderColor: '#4A70A9', color: '#4A70A9'}}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/signup">
                          <Button 
                            type="primary" 
                            size="large"
                            icon={<ArrowRightOutlined />}
                            style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                          >
                            Get Started Free
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button 
                            size="large"
                            style={{borderColor: '#4A70A9', color: '#4A70A9'}}
                          >
                            Sign In
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </Space>
              </motion.div>
            </Col>
            
            <Col xs={24} lg={12}>
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Stack of books with reading glasses"
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                  />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Open book"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants}>
            <Title 
              level={2} 
              className="font-display"
              style={{color: '#000000', textAlign: 'center', marginBottom: 64}}
            >
              Everything You Need to Love Reading
            </Title>
          </motion.div>
          
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    hoverable
                    style={{
                      textAlign: 'center',
                      borderColor: '#8FABD4',
                      borderWidth: 2,
                      borderRadius: 12,
                      height: '100%'
                    }}
                  >
                    <Avatar 
                      size={64} 
                      style={{backgroundColor: feature.color, marginBottom: 16}}
                      icon={<feature.icon style={{fontSize: 24}} />}
                    />
                    <Title level={4} className="font-display" style={{color: '#000000'}}>
                      {feature.title}
                    </Title>
                    <Text style={{color: '#4A70A9'}}>
                      {feature.description}
                    </Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#4A70A9'}}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants}>
            <Row gutter={[32, 32]}>
              {stats.map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <div style={{textAlign: 'center'}}>
                    <Title 
                      level={2}
                      className="font-display"
                      style={{
                        color: 'white',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        margin: 0,
                        marginBottom: 8
                      }}
                    >
                      {stat.title}
                    </Title>
                    <Text style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px'}}>
                      {stat.value}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants}>
            <Title 
              level={2} 
              className="font-display"
              style={{color: '#000000', textAlign: 'center', marginBottom: 64}}
            >
              What Our Readers Say
            </Title>
          </motion.div>
          
          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    style={{
                      textAlign: 'center',
                      borderColor: '#8FABD4',
                      borderWidth: 2,
                      borderRadius: 12,
                      height: '100%'
                    }}
                  >
                    <Avatar 
                      size={64} 
                      src={testimonial.image}
                      style={{marginBottom: 16}}
                    />
                    <Text 
                      style={{
                        color: '#4A70A9', 
                        fontSize: '16px', 
                        fontStyle: 'italic',
                        display: 'block',
                        marginBottom: 16
                      }}
                    >
                      "{testimonial.quote}"
                    </Text>
                    <Title level={5} style={{color: '#000000', margin: 0}}>
                      {testimonial.name}
                    </Title>
                    <Text style={{color: '#4A70A9'}}>
                      {testimonial.role}
                    </Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
        style={{backgroundColor: '#EFECE3'}}
      >
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
            alt="Reading background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={itemVariants}>
            <Title 
              level={2} 
              className="font-display"
              style={{color: '#000000', marginBottom: 24}}
            >
              Ready to Start Your Reading Journey?
            </Title>
            <Text style={{fontSize: '20px', color: '#4A70A9', display: 'block', marginBottom: 32}}>
              Join thousands of readers who have already transformed their reading experience with BookBuddy.
            </Text>
            
            <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button 
                      type="primary" 
                      size="large"
                      icon={<ArrowRightOutlined />}
                      style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button 
                    size="large"
                    icon={<LogoutOutlined />}
                    onClick={logout}
                    style={{borderColor: '#4A70A9', color: '#4A70A9'}}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button 
                      type="primary" 
                      size="large"
                      icon={<ArrowRightOutlined />}
                      style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                    >
                      Start Reading Today
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button 
                      size="large"
                      style={{borderColor: '#4A70A9', color: '#4A70A9'}}
                    >
                      Already a Member?
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;