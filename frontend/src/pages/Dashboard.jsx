import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, Button, Progress, Typography, Row, Col, Avatar, Tag, Space, Spin, message, Statistic, Divider, Badge, Modal, Form, InputNumber } from 'antd';
import { BookOutlined, StarOutlined, PlusOutlined, SearchOutlined, HeartOutlined, ClockCircleOutlined, UserOutlined, BulbOutlined, TagOutlined, RiseOutlined, CalendarOutlined, FireOutlined, AimOutlined, LineChartOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { bookService } from '../services/bookService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    currentlyReading: 0,
    wantToRead: 0,
    completed: 0,
    averageRating: 0,
    readingStreak: 0
  });
  const [recentBooks, setRecentBooks] = useState([]);
  const [chartData, setChartData] = useState({
    monthlyProgress: [],
    statusDistribution: [],
    readingTrend: []
  });
  const [readingGoal, setReadingGoal] = useState({
    year: new Date().getFullYear(),
    target: 50
  });
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [goalForm] = Form.useForm();

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

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Get all books for comprehensive analysis
      const allBooksData = await bookService.getBooks({ limit: 1000 });
      const recentBooksData = await bookService.getBooks({ limit: 5, sortBy: 'dateAdded' });
      
      const allBooks = allBooksData.books || [];
      const books = recentBooksData.books || [];
      const totalBooks = allBooksData.pagination?.total || 0;
      
      // Calculate stats from all books
      const currentlyReading = allBooks.filter(book => book.status === 'Reading').length;
      const wantToRead = allBooks.filter(book => book.status === 'Want to Read').length;
      const completed = allBooks.filter(book => book.status === 'Completed').length;
      
      // Calculate average rating
      const ratedBooks = allBooks.filter(book => book.rating > 0);
      const averageRating = ratedBooks.length > 0 
        ? (ratedBooks.reduce((sum, book) => sum + book.rating, 0) / ratedBooks.length).toFixed(1)
        : 0;
      
      // Calculate reading streak (simplified - books read in consecutive days)
      const readingStreak = Math.min(completed * 2 + currentlyReading, 30); // Mock calculation
      
      setStats({
        totalBooks,
        currentlyReading,
        wantToRead,
        completed,
        averageRating,
        readingStreak
      });
      
      setRecentBooks(books.slice(0, 3));
      
      // Generate chart data from real books
      generateChartData(allBooks);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (books) => {
    // Generate monthly progress data based on book creation dates
    const monthlyData = {};
    const currentDate = new Date();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      monthlyData[monthKey] = { month: monthKey, completed: 0, reading: 0, total: 0 };
    }
    
    // Count books by month
    books.forEach(book => {
      if (book.createdAt || book.dateAdded) {
        const bookDate = new Date(book.createdAt || book.dateAdded);
        const monthKey = bookDate.toLocaleDateString('en-US', { month: 'short' });
        
        if (monthlyData[monthKey]) {
          monthlyData[monthKey].total++;
          if (book.status === 'Completed') {
            monthlyData[monthKey].completed++;
          } else if (book.status === 'Reading') {
            monthlyData[monthKey].reading++;
          }
        }
      }
    });
    
    // Generate reading trend (cumulative)
    const trendData = Object.values(monthlyData).map((item, index) => ({
      ...item,
      books: Object.values(monthlyData).slice(0, index + 1).reduce((sum, month) => sum + month.completed, 0)
    }));
    
    // Status distribution
    const statusData = [
      { name: 'Completed', value: books.filter(b => b.status === 'Completed').length, color: '#52C41A' },
      { name: 'Reading', value: books.filter(b => b.status === 'Reading').length, color: '#FF6B35' },
      { name: 'Want to Read', value: books.filter(b => b.status === 'Want to Read').length, color: '#8FABD4' }
    ].filter(item => item.value > 0);
    
    setChartData({
      monthlyProgress: Object.values(monthlyData),
      statusDistribution: statusData,
      readingTrend: trendData
    });
  };

  useEffect(() => {
    loadDashboardData();
    loadReadingGoal();
  }, []);

  const loadReadingGoal = () => {
    const savedGoal = localStorage.getItem('readingGoal');
    if (savedGoal) {
      setReadingGoal(JSON.parse(savedGoal));
    }
  };

  const handleGoalSubmit = async () => {
    try {
      const values = await goalForm.validateFields();
      const newGoal = {
        year: values.year,
        target: values.target
      };
      setReadingGoal(newGoal);
      localStorage.setItem('readingGoal', JSON.stringify(newGoal));
      setIsGoalModalVisible(false);
      message.success('Reading goal updated successfully!');
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const openGoalModal = () => {
    goalForm.setFieldsValue(readingGoal);
    setIsGoalModalVisible(true);
  };

  const getDefaultBookCover = (genre) => {
    const bookCovers = {
      'Fiction': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=top',
      'Romance': 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop&crop=center',
      'Mystery': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center',
      'Biography': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center'
    };
    return bookCovers[genre] || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=top';
  };

  return (
    <motion.div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-white/85" />
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={16}>
              <div className="flex items-center space-x-4">
                <Avatar 
                  size={64} 
                  icon={<UserOutlined />}
                  style={{backgroundColor: '#4A70A9'}}
                />
                <div>
                  <Title 
                    level={2} 
                    className="font-display"
                    style={{color: '#000000', margin: 0}}
                  >
                    Welcome back, {user?.name}!
                  </Title>
                  <Text style={{fontSize: '16px', color: '#4A70A9'}}>
                    Here's your reading overview for today
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div style={{textAlign: 'right'}}>
                <Text style={{color: '#4A70A9', fontSize: '14px'}}>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Key Metrics */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <Statistic
                  title={<Text style={{color: '#666', fontWeight: 500}}>Total Books</Text>}
                  value={stats.totalBooks}
                  prefix={<BookOutlined style={{color: '#4A70A9'}} />}
                  valueStyle={{color: '#000', fontSize: '28px', fontWeight: 'bold'}}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <Statistic
                  title={<Text style={{color: '#666', fontWeight: 500}}>Currently Reading</Text>}
                  value={stats.currentlyReading}
                  prefix={<FireOutlined style={{color: '#FF6B35'}} />}
                  valueStyle={{color: '#FF6B35', fontSize: '28px', fontWeight: 'bold'}}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <Statistic
                  title={<Text style={{color: '#666', fontWeight: 500}}>Completed</Text>}
                  value={stats.completed}
                  prefix={<StarOutlined style={{color: '#52C41A'}} />}
                  valueStyle={{color: '#52C41A', fontSize: '28px', fontWeight: 'bold'}}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <Statistic
                  title={<Text style={{color: '#666', fontWeight: 500}}>Want to Read</Text>}
                  value={stats.wantToRead}
                  prefix={<HeartOutlined style={{color: '#8FABD4'}} />}
                  valueStyle={{color: '#8FABD4', fontSize: '28px', fontWeight: 'bold'}}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[24, 24]} className="mb-8">
          {/* Reading Progress Chart */}
          <Col xs={24} lg={12}>
            <motion.div variants={itemVariants}>
              <Card 
                title={
                  <div className="flex items-center space-x-2">
                    <LineChartOutlined style={{color: '#4A70A9'}} />
                    <Title level={5} style={{color: '#000000', margin: 0}}>Reading Progress</Title>
                  </div>
                }
                style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
              >
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData.readingTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #8FABD4',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="books" 
                      stroke="#4A70A9" 
                      strokeWidth={3}
                      dot={{ fill: '#4A70A9', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Col>

          {/* Book Status Distribution */}
          <Col xs={24} lg={12}>
            <motion.div variants={itemVariants}>
              <Card 
                title={
                  <div className="flex items-center space-x-2">
                    <RiseOutlined style={{color: '#4A70A9'}} />
                    <Title level={5} style={{color: '#000000', margin: 0}}>Book Status</Title>
                  </div>
                }
                style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
              >
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={chartData.statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #8FABD4',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <div style={{width: '12px', height: '12px', backgroundColor: '#52C41A', borderRadius: '50%'}} />
                    <Text style={{fontSize: '12px', color: '#666'}}>Completed</Text>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <div style={{width: '12px', height: '12px', backgroundColor: '#FF6B35', borderRadius: '50%'}} />
                    <Text style={{fontSize: '12px', color: '#666'}}>Reading</Text>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <div style={{width: '12px', height: '12px', backgroundColor: '#8FABD4', borderRadius: '50%'}} />
                    <Text style={{fontSize: '12px', color: '#666'}}>Want to Read</Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {/* Recent Activity */}
          <Col xs={24} lg={16}>
            <motion.div variants={itemVariants}>
              <Card 
                title={
                  <div className="flex items-center space-x-2">
                    <LineChartOutlined style={{color: '#4A70A9'}} />
                    <Title 
                      level={4} 
                      className="font-display"
                      style={{color: '#000000', margin: 0}}
                    >
                      Recent Activity
                    </Title>
                  </div>
                }
                extra={<Link to="/my-books"><Button type="link" style={{color: '#4A70A9'}}>View Library →</Button></Link>}
                style={{
                  borderRadius: 16,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {loading ? (
                  <div style={{textAlign: 'center', padding: '40px 0'}}>
                    <Spin size="large" />
                    <div style={{marginTop: 16}}>
                      <Text style={{color: '#4A70A9'}}>Loading your books...</Text>
                    </div>
                  </div>
                ) : recentBooks.length > 0 ? (
                  <Space direction="vertical" size="middle" style={{width: '100%'}}>
                    {recentBooks.map((book, index) => (
                      <motion.div 
                        key={book.id || index}
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
                                src={book.cover || getDefaultBookCover(book.genre)} 
                                alt={book.title}
                                className="w-12 h-16 object-cover rounded"
                                onError={(e) => {
                                  e.target.src = getDefaultBookCover(book.genre);
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
                ) : (
                  <div style={{textAlign: 'center', padding: '60px 20px'}}>
                    <BookOutlined style={{fontSize: 64, color: '#8FABD4', marginBottom: 16}} />
                    <Title level={4} style={{color: '#000000', marginBottom: 8}}>Start Your Reading Journey</Title>
                    <Text style={{color: '#4A70A9', fontSize: '16px', display: 'block', marginBottom: 24}}>Add your first book to begin tracking your progress</Text>
                    <Link to="/my-books">
                      <Button type="primary" size="large" icon={<PlusOutlined />} style={{backgroundColor: '#4A70A9'}}>
                        Add Your First Book
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            </motion.div>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" style={{width: '100%'}}>
              {/* Reading Goal Progress */}
              <motion.div variants={itemVariants}>
                <Card 
                  style={{
                    borderRadius: 16,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(135deg, #4A70A9 0%, #8FABD4 100%)'
                  }}
                >
                  <div style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                      <AimOutlined style={{fontSize: 32, color: 'white'}} />
                      <Button 
                        type="text" 
                        icon={<SettingOutlined />} 
                        size="small"
                        onClick={openGoalModal}
                        style={{color: 'white', opacity: 0.8}}
                      />
                    </div>
                    <Title level={4} style={{color: 'white', margin: 0, marginBottom: 8}}>
                      {readingGoal.year} Reading Goal
                    </Title>
                    <Progress 
                      percent={stats.completed > 0 ? Math.min((stats.completed / readingGoal.target) * 100, 100) : 0}
                      strokeColor="white"
                      trailColor="rgba(255,255,255,0.3)"
                      showInfo={false}
                      strokeWidth={8}
                      style={{marginBottom: 16}}
                    />
                    <Text style={{color: 'white', fontSize: '18px', fontWeight: 'bold'}}>
                      {stats.completed} / {readingGoal.target} Books
                    </Text>
                    <br />
                    <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px'}}>
                      {stats.completed >= readingGoal.target ? 'Goal achieved! 🎉' : `${readingGoal.target - stats.completed} books to go`}
                    </Text>
                  </div>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants}>
                <Card 
                  title={
                    <div className="flex items-center space-x-2">
                      <BulbOutlined style={{color: '#4A70A9'}} />
                      <Title level={5} style={{color: '#000000', margin: 0}}>Quick Actions</Title>
                    </div>
                  }
                  style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                >
                  <Space direction="vertical" size="middle" style={{width: '100%'}}>
                    <Link to="/my-books">
                      <Button 
                        type="primary" 
                        size="large" 
                        block 
                        icon={<PlusOutlined />}
                        style={{backgroundColor: '#4A70A9', borderRadius: 8, height: 48}}
                      >
                        Add New Book
                      </Button>
                    </Link>
                    <Link to="/my-books">
                      <Button 
                        size="large" 
                        block 
                        icon={<SearchOutlined />}
                        style={{borderColor: '#8FABD4', color: '#4A70A9', borderRadius: 8, height: 48}}
                      >
                        Browse Library
                      </Button>
                    </Link>
                    <Link to="/recommendations">
                      <Button 
                        size="large" 
                        block 
                        icon={<StarOutlined />}
                        style={{borderColor: '#8FABD4', color: '#4A70A9', borderRadius: 8, height: 48}}
                      >
                        Get Recommendations
                      </Button>
                    </Link>
                  </Space>
                </Card>
              </motion.div>

              {/* Monthly Reading Chart */}
              <motion.div variants={itemVariants}>
                <Card 
                  title={
                    <div className="flex items-center space-x-2">
                      <BarChartOutlined style={{color: '#4A70A9'}} />
                      <Title level={5} style={{color: '#000000', margin: 0}}>Monthly Progress</Title>
                    </div>
                  }
                  style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                >
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData.monthlyProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" fontSize={11} />
                      <YAxis stroke="#666" fontSize={11} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #8FABD4',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="completed" fill="#52C41A" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="reading" fill="#FF6B35" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <div style={{width: '10px', height: '10px', backgroundColor: '#52C41A', borderRadius: '2px'}} />
                      <Text style={{fontSize: '11px', color: '#666'}}>Completed</Text>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <div style={{width: '10px', height: '10px', backgroundColor: '#FF6B35', borderRadius: '2px'}} />
                      <Text style={{fontSize: '11px', color: '#666'}}>Reading</Text>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Reading Insights */}
              <motion.div variants={itemVariants}>
                <Card 
                  title={
                    <div className="flex items-center space-x-2">
                      <RiseOutlined style={{color: '#4A70A9'}} />
                      <Title level={5} style={{color: '#000000', margin: 0}}>Reading Insights</Title>
                    </div>
                  }
                  style={{borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                >
                  <Space direction="vertical" size="middle" style={{width: '100%'}}>
                    <div className="flex justify-between items-center">
                      <Text style={{color: '#666'}}>This Month</Text>
                      <Badge count={stats.currentlyReading} style={{backgroundColor: '#4A70A9'}} />
                    </div>
                    <Divider style={{margin: '8px 0'}} />
                    <div className="flex justify-between items-center">
                      <Text style={{color: '#666'}}>Average Rating</Text>
                      <div className="flex items-center space-x-1">
                        <StarOutlined style={{color: '#FFD700', fontSize: '14px'}} />
                        <Text style={{color: '#000', fontWeight: 'bold'}}>{stats.averageRating}</Text>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text style={{color: '#666'}}>Reading Streak</Text>
                      <div className="flex items-center space-x-1">
                        <FireOutlined style={{color: '#FF6B35', fontSize: '14px'}} />
                        <Text style={{color: '#000', fontWeight: 'bold'}}>{stats.readingStreak} days</Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </motion.div>
            </Space>
          </Col>
        </Row>

        {/* Reading Goal Modal */}
        <Modal
          title="Set Reading Goal"
          open={isGoalModalVisible}
          onOk={handleGoalSubmit}
          onCancel={() => setIsGoalModalVisible(false)}
          okButtonProps={{
            style: {backgroundColor: '#4A70A9', borderColor: '#4A70A9'}
          }}
        >
          <Form form={goalForm} layout="vertical">
            <Form.Item
              name="year"
              label="Target Year"
              rules={[{ required: true, message: 'Please select a year' }]}
            >
              <InputNumber 
                min={2020} 
                max={2030} 
                style={{width: '100%'}}
                placeholder="e.g., 2024"
              />
            </Form.Item>
            <Form.Item
              name="target"
              label="Books Target"
              rules={[{ required: true, message: 'Please set a target number of books' }]}
            >
              <InputNumber 
                min={1} 
                max={365} 
                style={{width: '100%'}}
                placeholder="e.g., 50"
              />
            </Form.Item>
            <div style={{color: '#666', fontSize: '14px', marginTop: 8}}>
              Set a realistic goal based on your reading habits. You can always adjust it later!
            </div>
          </Form>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Dashboard;