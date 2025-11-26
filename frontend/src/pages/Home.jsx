import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Typography, Row, Col, Card, Avatar, Space, Statistic } from 'antd';
import { BookOutlined, StarOutlined, BarChartOutlined, UserOutlined, ArrowRightOutlined, LogoutOutlined, TrophyOutlined, HeartOutlined, RocketOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
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
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, rgba(239, 236, 227, 0.9) 0%, rgba(239, 236, 227, 0.95) 100%), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
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
        <div className="max-w-7xl mx-auto" style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 16,
          padding: '40px 24px',
          boxShadow: '0 8px 32px rgba(74, 112, 169, 0.1)'
        }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
            }}
          >
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
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: index * 0.1 } }
                  }}
                >
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
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: 'rgba(74, 112, 169, 0.95)'}}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants}>
            <Row gutter={[32, 32]}>
              {stats.map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <motion.div 
                    style={{textAlign: 'center'}}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
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
                    </motion.div>
                    <Text style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', display: 'block'}}>
                      {stat.value}
                    </Text>
                    <Text style={{color: '#8FABD4', fontSize: '14px'}}>
                      {stat.growth} this year
                    </Text>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Why Choose BookBuddy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '40px 24px',
          boxShadow: '0 8px 32px rgba(74, 112, 169, 0.15)'
        }}>
          <motion.div variants={itemVariants}>
            <Title 
              level={2} 
              className="font-display"
              style={{color: '#000000', textAlign: 'center', marginBottom: 64}}
            >
              Why Choose BookBuddy?
            </Title>
          </motion.div>
          
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Reading analytics"
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" style={{width: '100%'}}>
                {[
                  {
                    icon: LockOutlined,
                    title: 'Privacy First',
                    description: 'Your reading data is secure and private. We never share your information.',
                    color: '#4A70A9'
                  },
                  {
                    icon: RocketOutlined,
                    title: 'Lightning Fast',
                    description: 'Quick book searches, instant recommendations, and seamless syncing.',
                    color: '#8FABD4'
                  },
                  {
                    icon: HeartOutlined,
                    title: 'Made by Readers',
                    description: 'Built by book lovers, for book lovers. We understand your needs.',
                    color: '#4A70A9'
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Avatar 
                        size={48}
                        style={{backgroundColor: benefit.color, flexShrink: 0}}
                        icon={<benefit.icon />}
                      />
                    </motion.div>
                    <div>
                      <Title level={4} style={{color: '#000000', marginBottom: 8}}>
                        {benefit.title}
                      </Title>
                      <Text style={{color: '#4A70A9', fontSize: '16px'}}>
                        {benefit.description}
                      </Text>
                    </div>
                  </motion.div>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      </section>

      {/* Reading Journey Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '40px 24px',
          boxShadow: '0 8px 32px rgba(74, 112, 169, 0.15)'
        }}>
          <motion.div variants={itemVariants}>
            <Title 
              level={2} 
              className="font-display"
              style={{color: '#000000', textAlign: 'center', marginBottom: 64}}
            >
              Your Reading Journey Starts Here
            </Title>
          </motion.div>
          
          <Row gutter={[32, 32]}>
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description: 'Set up your reading preferences and goals',
                icon: UserOutlined,
                color: '#4A70A9'
              },
              {
                step: '02', 
                title: 'Add Your Books',
                description: 'Import your library or start fresh with our recommendations',
                icon: BookOutlined,
                color: '#8FABD4'
              },
              {
                step: '03',
                title: 'Track Progress',
                description: 'Monitor your reading with detailed insights and analytics',
                icon: BarChartOutlined,
                color: '#4A70A9'
              },
              {
                step: '04',
                title: 'Discover & Connect',
                description: 'Find new books and connect with fellow readers',
                icon: StarOutlined,
                color: '#8FABD4'
              }
            ].map((item, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    style={{
                      textAlign: 'center',
                      borderColor: item.color,
                      borderWidth: 2,
                      borderRadius: 16,
                      height: '100%',
                      background: `linear-gradient(135deg, ${item.color}10 0%, ${item.color}05 100%)`,
                      position: 'relative',
                      overflow: 'visible'
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: item.color,
                        color: 'white',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.step}
                    </motion.div>
                    <div style={{paddingTop: 20}}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Avatar 
                          size={56}
                          style={{backgroundColor: item.color, marginBottom: 16}}
                          icon={<item.icon style={{fontSize: 20}} />}
                        />
                      </motion.div>
                      <Title level={4} style={{color: '#000000', marginBottom: 12}}>
                        {item.title}
                      </Title>
                      <Text style={{color: '#4A70A9'}}>
                        {item.description}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Book Categories Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '40px 24px',
          boxShadow: '0 8px 32px rgba(74, 112, 169, 0.15)'
        }}>
          <motion.div variants={itemVariants}>
            <Title 
              level={2} 
              className="font-display"
              style={{color: '#000000', textAlign: 'center', marginBottom: 64}}
            >
              Explore Every Genre
            </Title>
          </motion.div>
          
          <Row gutter={[24, 24]}>
            {[
              { name: 'Fiction', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', books: '15K+' },
              { name: 'Mystery', image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', books: '8K+' },
              { name: 'Romance', image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', books: '12K+' },
              { name: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', books: '6K+' },
              { name: 'Biography', image: 'https://images.unsplash.com/photo-1472173148041-00294f0814a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', books: '4K+' },
              { name: 'Self-Help', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', books: '7K+' }
            ].map((genre, index) => (
              <Col xs={12} sm={8} lg={4} key={index}>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: index * 0.1 } }
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    hoverable
                    cover={
                      <div style={{position: 'relative', overflow: 'hidden', height: 150}}>
                        <motion.img
                          src={genre.image}
                          alt={genre.name}
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(135deg, rgba(74, 112, 169, 0.7) 0%, rgba(143, 171, 212, 0.7) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{textAlign: 'center'}}>
                            <Title level={4} style={{color: 'white', margin: 0, marginBottom: 4}}>
                              {genre.name}
                            </Title>
                            <Text style={{color: 'rgba(255,255,255,0.9)'}}>
                              {genre.books} books
                            </Text>
                          </div>
                        </div>
                      </div>
                    }
                    style={{
                      borderColor: '#8FABD4',
                      borderWidth: 2,
                      borderRadius: 12
                    }}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '40px 24px',
          boxShadow: '0 8px 32px rgba(74, 112, 169, 0.15)'
        }}>
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
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    style={{
                      textAlign: 'center',
                      borderColor: '#8FABD4',
                      borderWidth: 2,
                      borderRadius: 16,
                      height: '100%',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Avatar 
                        size={64} 
                        src={testimonial.image}
                        style={{marginBottom: 16}}
                      />
                    </motion.div>
                    <div style={{marginBottom: 16}}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <StarOutlined style={{color: '#FFD700', fontSize: '16px'}} />
                          <StarOutlined style={{color: '#FFD700', fontSize: '16px'}} />
                          <StarOutlined style={{color: '#FFD700', fontSize: '16px'}} />
                          <StarOutlined style={{color: '#FFD700', fontSize: '16px'}} />
                          <StarOutlined style={{color: '#FFD700', fontSize: '16px'}} />
                        </motion.span>
                      ))}
                    </div>
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