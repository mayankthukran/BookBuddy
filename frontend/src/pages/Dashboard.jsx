import { useAuth } from '../context/AuthContext';
import { Card, Button, Progress, Typography, Row, Col, Avatar, Tag, Space } from 'antd';
import { BookOutlined, StarOutlined, PlusOutlined, SearchOutlined, HeartOutlined, ClockCircleOutlined, UserOutlined, BulbOutlined, TagOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useAuth();

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

  const stats = [
    { label: 'Books Read', value: '24', icon: BookOutlined, color: '#4A70A9' },
    { label: 'Currently Reading', value: '3', icon: ClockCircleOutlined, color: '#8FABD4' },
    { label: 'Want to Read', value: '47', icon: HeartOutlined, color: '#4A70A9' },
    { label: 'Reading Goal', value: '50/60', icon: StarOutlined, color: '#8FABD4' }
  ];

  const recentBooks = [
    { 
      title: 'The Midnight Library', 
      author: 'Matt Haig', 
      status: 'Reading', 
      progress: 65,
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg'
    },
    { 
      title: 'Atomic Habits', 
      author: 'James Clear', 
      status: 'Completed', 
      progress: 100,
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg'
    },
    { 
      title: 'Dune', 
      author: 'Frank Herbert', 
      status: 'Want to Read', 
      progress: 0,
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg'
    }
  ];

  return (
    <motion.div 
      className="min-h-screen light-bg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8 sm:mb-12 text-center sm:text-left"
          variants={itemVariants}
        >
          <Title 
            level={1} 
            className="font-display"
            style={{color: '#000000', marginBottom: 16}}
          >
            Welcome back, {user?.name}!
          </Title>
          <Text style={{fontSize: '18px', color: '#4A70A9'}}>
            Track your progress, discover new books, and achieve your reading goals.
          </Text>
        </motion.div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          {stats.map((stat, index) => (
            <Col xs={12} lg={6} key={index}>
              <motion.div variants={itemVariants}>
                <Card 
                  hoverable
                  style={{
                    borderColor: '#8FABD4',
                    borderWidth: 2,
                    borderRadius: 12
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Text style={{color: '#4A70A9', fontSize: '14px'}}>{stat.label}</Text>
                      <Title level={2} style={{color: '#000000', margin: 0}}>{stat.value}</Title>
                    </div>
                    <Avatar 
                      size={48} 
                      style={{backgroundColor: stat.color}}
                      icon={<stat.icon />}
                    />
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          {/* Recent Activity */}
          <Col xs={24} lg={16}>
            <motion.div variants={itemVariants}>
              <Card 
                title={
                  <Title 
                    level={3} 
                    className="font-display"
                    style={{color: '#000000', margin: 0}}
                  >
                    Recent Books
                  </Title>
                }
                extra={<Button type="link" style={{color: '#4A70A9'}}>View All</Button>}
                style={{
                  borderColor: '#8FABD4',
                  borderWidth: 2,
                  borderRadius: 12
                }}
              >
                <Space direction="vertical" size="middle" style={{width: '100%'}}>
                  {recentBooks.map((book, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        size="small" 
                        hoverable
                        style={{backgroundColor: '#EFECE3'}}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={book.cover} 
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA0OCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOEZBQkQ0Ii8+CjxwYXRoIGQ9Ik0yNCAzMkMyNi4yMDkxIDMyIDI4IDMwLjIwOTEgMjggMjhDMjggMjUuNzkwOSAyNi4yMDkxIDI0IDI0IDI0QzIxLjc5MDkgMjQgMjAgMjUuNzkwOSAyMCAyOEMyMCAzMC4yMDkxIDIxLjc5MDkgMzIgMjQgMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div>
                              <Title 
                                level={5} 
                                className="font-semibold"
                                style={{color: '#000000', margin: 0}}
                              >
                                {book.title}
                              </Title>
                              <Text style={{color: '#4A70A9'}}>by {book.author}</Text>
                              <div className="mt-1">
                                <Tag color={book.status === 'Completed' ? 'green' : book.status === 'Reading' ? 'blue' : 'default'}>
                                  {book.status}
                                </Tag>
                              </div>
                            </div>
                          </div>
                          {book.progress > 0 && (
                            <div className="text-right">
                              <Text style={{color: '#000000'}}>{book.progress}%</Text>
                              <Progress 
                                percent={book.progress} 
                                size="small" 
                                strokeColor="#4A70A9"
                                showInfo={false}
                                style={{width: 80}}
                              />
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </Space>
              </Card>
            </motion.div>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" style={{width: '100%'}}>
              {/* Quick Actions */}
              <motion.div variants={itemVariants}>
                <Card 
                  title={
                    <Title 
                      level={4} 
                      className="font-display"
                      style={{color: '#000000', margin: 0}}
                    >
                      Quick Actions
                    </Title>
                  }
                  style={{
                    borderColor: '#8FABD4',
                    borderWidth: 2,
                    borderRadius: 12
                  }}
                >
                  <Space direction="vertical" size="middle" style={{width: '100%'}}>
                    <Button 
                      type="primary" 
                      size="large" 
                      block 
                      icon={<PlusOutlined />}
                      style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                    >
                      Add New Book
                    </Button>
                    <Button 
                      size="large" 
                      block 
                      icon={<SearchOutlined />}
                      style={{backgroundColor: '#8FABD4', borderColor: '#8FABD4', color: 'white'}}
                    >
                      Browse Library
                    </Button>
                    <Button 
                      type="primary" 
                      size="large" 
                      block 
                      icon={<BulbOutlined />}
                      style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                    >
                      Get Recommendations
                    </Button>
                  </Space>
                </Card>
              </motion.div>

              {/* Reading Goals */}
              <motion.div variants={itemVariants}>
                <Card 
                  title={
                    <Title 
                      level={4} 
                      className="font-display"
                      style={{color: '#000000', margin: 0}}
                    >
                      2024 Reading Goal
                    </Title>
                  }
                  style={{
                    borderColor: '#8FABD4',
                    borderWidth: 2,
                    borderRadius: 12
                  }}
                >
                  <div className="text-center">
                    <Progress 
                      type="circle" 
                      percent={83} 
                      strokeColor="#4A70A9"
                      size={100}
                      format={() => '83%'}
                    />
                    <div className="mt-4">
                      <Text style={{color: '#4A70A9'}}>50 of 60 books completed</Text>
                      <br />
                      <Text style={{color: '#4A70A9', fontSize: '12px'}}>You're ahead of schedule! 🎉</Text>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Community */}
              <motion.div variants={itemVariants}>
                <Card 
                  title={
                    <Title 
                      level={4} 
                      className="font-display"
                      style={{color: '#000000', margin: 0}}
                    >
                      Community
                    </Title>
                  }
                  style={{
                    borderColor: '#8FABD4',
                    borderWidth: 2,
                    borderRadius: 12
                  }}
                >
                  <Space direction="vertical" size="middle">
                    <div className="flex items-center space-x-3">
                      <UserOutlined style={{color: '#4A70A9', fontSize: '16px'}} />
                      <Text style={{color: '#000000'}}>Join reading groups</Text>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TagOutlined style={{color: '#4A70A9', fontSize: '16px'}} />
                      <Text style={{color: '#000000'}}>Share book reviews</Text>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StarOutlined style={{color: '#4A70A9', fontSize: '16px'}} />
                      <Text style={{color: '#000000'}}>Rate & recommend</Text>
                    </div>
                  </Space>
                </Card>
              </motion.div>
            </Space>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default Dashboard;