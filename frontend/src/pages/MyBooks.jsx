import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  Button, 
  Input, 
  Select, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Tag, 
  Progress, 
  Modal, 
  Form, 
  InputNumber,
  Rate,
  Empty,
  Pagination,
  message,
  Spin,
  Statistic,
  Divider,
  Tooltip,
  Badge,
  Avatar,
  Dropdown,
  Menu
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  BookOutlined,
  FilterOutlined,
  EyeOutlined,
  MoreOutlined,
  CalendarOutlined,
  StarFilled,
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  HeartOutlined,
  UserOutlined,
  StarOutlined,
  ReadOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { bookService } from '../services/bookService';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [pagination, setPagination] = useState({ total: 0, current: 1, pageSize: 8 });
  const [form] = Form.useForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Load books from API
  const loadBooks = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: pageSize,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        genre: genreFilter !== 'all' ? genreFilter : undefined,
        search: searchTerm || undefined,
        sortBy
      };
      
      const data = await bookService.getBooks(params);
      setBooks(data.books);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error loading books:', error);
      message.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [currentPage, statusFilter, genreFilter, searchTerm, sortBy]);

  const handleAddBook = () => {
    setEditingBook(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    form.setFieldsValue(book);
    setIsModalVisible(true);
  };

  const handleDeleteBook = (bookId) => {
    Modal.confirm({
      title: 'Delete Book',
      content: 'Are you sure you want to delete this book?',
      onOk: async () => {
        try {
          await bookService.deleteBook(bookId);
          message.success('Book deleted successfully');
          loadBooks();
        } catch (error) {
          console.error('Error deleting book:', error);
          message.error('Failed to delete book');
        }
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingBook) {
        // Update existing book
        await bookService.updateBook(editingBook.id, values);
        message.success('Book updated successfully');
      } else {
        // Add new book
        await bookService.createBook(values);
        message.success('Book added successfully');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      loadBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      message.error('Failed to save book');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'Reading': return 'blue';
      case 'Want to Read': return 'orange';
      default: return 'default';
    }
  };

  const getDefaultBookCover = (genre) => {
    const bookCovers = {
      'Fiction': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=top',
      'Romance': 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop&crop=center',
      'Mystery': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center',
      'Biography': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center',
      'Science Fiction': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=400&fit=crop&crop=center',
      'Fantasy': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center',
      'Dystopian': 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop&crop=center',
      'Thriller': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center',
      'Horror': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center',
      'Self-Help': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop&crop=center',
      'History': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center',
      'Philosophy': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center'
    };
    return bookCovers[genre] || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=top';
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <motion.div 
      className="min-h-screen py-8" 
      style={{backgroundColor: '#EFECE3'}}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={12}>
              <div>
                <Title level={1} className="font-display" style={{color: '#000000', margin: 0}}>
                  My Library
                </Title>
                <Text style={{color: '#4A70A9', fontSize: '18px'}}>
                  Curate and track your reading journey
                </Text>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{textAlign: 'right'}}>
                <Space size="middle">
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<PlusOutlined />}
                    onClick={handleAddBook}
                    style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                  >
                    Add Book
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants} className="mb-8">
          <Row gutter={[24, 24]}>
            <Col xs={12} sm={6}>
              <Card style={{textAlign: 'center', borderColor: '#8FABD4', borderWidth: 1}}>
                <Statistic
                  title="Total Books"
                  value={pagination.total}
                  prefix={<BookOutlined style={{color: '#4A70A9'}} />}
                  valueStyle={{color: '#000000', fontWeight: 'bold'}}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{textAlign: 'center', borderColor: '#8FABD4', borderWidth: 1}}>
                <Statistic
                  title="Reading"
                  value={books.filter(b => b.status === 'Reading').length}
                  prefix={<FireOutlined style={{color: '#FF6B35'}} />}
                  valueStyle={{color: '#000000', fontWeight: 'bold'}}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{textAlign: 'center', borderColor: '#8FABD4', borderWidth: 1}}>
                <Statistic
                  title="Completed"
                  value={books.filter(b => b.status === 'Completed').length}
                  prefix={<CheckCircleOutlined style={{color: '#52C41A'}} />}
                  valueStyle={{color: '#000000', fontWeight: 'bold'}}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{textAlign: 'center', borderColor: '#8FABD4', borderWidth: 1}}>
                <Statistic
                  title="Want to Read"
                  value={books.filter(b => b.status === 'Want to Read').length}
                  prefix={<HeartOutlined style={{color: '#8FABD4'}} />}
                  valueStyle={{color: '#000000', fontWeight: 'bold'}}
                />
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* Advanced Filters */}
        <motion.div variants={itemVariants}>
          <Card 
            title={
              <Space>
                <FilterOutlined style={{color: '#4A70A9'}} />
                <Text strong style={{color: '#000000'}}>Filter & Search</Text>
              </Space>
            }
            style={{marginBottom: 24, borderColor: '#8FABD4', borderWidth: 1, borderRadius: 12}}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={8}>
                <Input
                  placeholder="Search by title, author, or notes..."
                  prefix={<SearchOutlined style={{color: '#4A70A9'}} />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="large"
                  style={{borderColor: '#8FABD4'}}
                />
              </Col>
              <Col xs={8} md={4}>
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{width: '100%'}}
                  size="large"
                  placeholder="Status"
                >
                  <Option value="all">All Status</Option>
                  <Option value="Reading"><FireOutlined /> Reading</Option>
                  <Option value="Completed"><CheckCircleOutlined /> Completed</Option>
                  <Option value="Want to Read"><HeartOutlined /> Want to Read</Option>
                </Select>
              </Col>
              <Col xs={8} md={4}>
                <Select
                  value={genreFilter}
                  onChange={setGenreFilter}
                  style={{width: '100%'}}
                  size="large"
                  placeholder="Genre"
                >
                  <Option value="all">All Genres</Option>
                  <Option value="Fiction">Fiction</Option>
                  <Option value="Romance">Romance</Option>
                  <Option value="Mystery">Mystery</Option>
                  <Option value="Biography">Biography</Option>
                  <Option value="Science Fiction">Sci-Fi</Option>
                  <Option value="Fantasy">Fantasy</Option>
                </Select>
              </Col>
              <Col xs={8} md={4}>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  style={{width: '100%'}}
                  size="large"
                  placeholder="Sort by"
                >
                  <Option value="title"><BookOutlined /> Title</Option>
                  <Option value="author"><UserOutlined /> Author</Option>
                  <Option value="rating"><StarOutlined /> Rating</Option>
                  <Option value="dateAdded"><CalendarOutlined /> Date Added</Option>
                </Select>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Books Grid */}
        {loading ? (
          <motion.div 
            style={{textAlign: 'center', padding: '60px 0'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Spin size="large" />
            </motion.div>
            <motion.div 
              style={{marginTop: 16}}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Text style={{color: '#4A70A9'}}>Loading your books...</Text>
            </motion.div>
          </motion.div>
        ) : books.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {books.map((book, index) => (
                <Col xs={24} sm={12} lg={8} xl={6} key={book.id}>
                  <motion.div 
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div
                    whileHover={{ 
                      y: -8,
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Card
                        hoverable
                        style={{
                          borderColor: '#8FABD4',
                          borderWidth: 1,
                          borderRadius: 16,
                          height: '100%',
                          overflow: 'hidden',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease'
                        }}
                      cover={
                        <motion.div 
                          style={{height: 220, overflow: 'hidden', position: 'relative'}}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <motion.img 
                            src={book.cover || getDefaultBookCover(book.genre)}
                            alt={book.title}
                            style={{
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              filter: 'brightness(0.95) contrast(1.1)'
                            }}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ 
                              filter: 'brightness(1.1) contrast(1.2)',
                              transition: { duration: 0.2 }
                            }}
                            onError={(e) => {
                              e.target.src = getDefaultBookCover(book.genre);
                            }}
                          />
                          <motion.div 
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(135deg, rgba(74,112,169,0.1) 0%, rgba(143,171,212,0.1) 100%)',
                              opacity: 0
                            }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            background: 'rgba(255,255,255,0.9)',
                            borderRadius: '50%',
                            padding: '4px'
                          }}>
                            <Dropdown
                              menu={{
                                items: [
                                  {
                                    key: 'view',
                                    label: 'View Details',
                                    icon: <EyeOutlined />
                                  },
                                  {
                                    key: 'edit',
                                    label: 'Edit Book',
                                    icon: <EditOutlined />,
                                    onClick: () => handleEditBook(book)
                                  },
                                  {
                                    type: 'divider'
                                  },
                                  {
                                    key: 'delete',
                                    label: 'Delete Book',
                                    icon: <DeleteOutlined />,
                                    danger: true,
                                    onClick: () => handleDeleteBook(book.id)
                                  }
                                ]
                              }}
                              trigger={['click']}
                            >
                              <Button 
                                type="text" 
                                icon={<MoreOutlined />} 
                                size="small"
                                style={{color: '#4A70A9'}}
                              />
                            </Dropdown>
                          </div>
                        </motion.div>
                      }
                    >
                      <div style={{padding: '16px'}}>
                        <div style={{marginBottom: 12}}>
                          <Tooltip title={book.title}>
                            <Title 
                              level={5} 
                              style={{
                                color: '#000000', 
                                margin: 0, 
                                marginBottom: 4,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {book.title}
                            </Title>
                          </Tooltip>
                          <Text style={{color: '#4A70A9', fontSize: '13px'}}>
                            by {book.author}
                          </Text>
                        </div>
                        
                        <Space direction="vertical" size="small" style={{width: '100%'}}>
                          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Tag 
                              color={getStatusColor(book.status)}
                              style={{borderRadius: '12px', fontSize: '11px'}}
                            >
                              {book.status}
                            </Tag>
                            <Text style={{color: '#8FABD4', fontSize: '11px'}}>
                              <CalendarOutlined /> {new Date(book.createdAt || book.dateAdded).toLocaleDateString()}
                            </Text>
                          </div>
                          
                          {book.status === 'Reading' && book.progress > 0 && (
                            <div>
                              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                                <Text style={{color: '#000000', fontSize: '12px'}}>
                                  Reading Progress
                                </Text>
                                <Text style={{color: '#4A70A9', fontSize: '12px', fontWeight: 'bold'}}>
                                  {book.progress}%
                                </Text>
                              </div>
                              <Progress 
                                percent={book.progress} 
                                size="small" 
                                strokeColor={{
                                  '0%': '#8FABD4',
                                  '100%': '#4A70A9',
                                }}
                                showInfo={false}
                                strokeWidth={6}
                              />
                            </div>
                          )}
                          
                          {book.rating > 0 && (
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                              <Rate 
                                disabled 
                                value={book.rating} 
                                style={{fontSize: '14px', color: '#FFD700'}} 
                              />
                              <Text style={{color: '#4A70A9', fontSize: '12px'}}>({book.rating}/5)</Text>
                            </div>
                          )}
                          
                          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Badge 
                              count={book.genre} 
                              style={{
                                backgroundColor: '#EFECE3', 
                                color: '#4A70A9',
                                fontSize: '10px',
                                borderRadius: '8px'
                              }} 
                            />
                            {book.pages && (
                              <Text style={{color: '#8FABD4', fontSize: '11px'}}>
                                <ReadOutlined /> {book.pages} pages
                              </Text>
                            )}
                          </div>
                          
                          {book.notes && (
                            <Tooltip title={book.notes}>
                              <Text 
                                style={{
                                  color: '#4A70A9', 
                                  fontSize: '11px',
                                  fontStyle: 'italic',
                                  display: 'block',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                <FileTextOutlined /> {book.notes}
                              </Text>
                            </Tooltip>
                          )}
                        </Space>
                      </div>
                    </Card>
                  </motion.div>
                  </motion.div>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div style={{textAlign: 'center', marginTop: 32}}>
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => 
                  `${range[0]}-${range[1]} of ${total} books`
                }
              />
            </div>
          </>
        ) : (
          <motion.div 
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={{
              textAlign: 'center', 
              padding: '40px 20px',
              borderColor: '#8FABD4',
              borderWidth: 1,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #EFECE3 0%, #F8F9FA 100%)'
            }}>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BookOutlined style={{fontSize: 64, color: '#8FABD4', marginBottom: 16}} />
              </motion.div>
              <Title level={3} style={{color: '#000000', marginBottom: 8}}>
                {searchTerm || statusFilter !== 'all' || genreFilter !== 'all' 
                  ? 'No books match your filters' 
                  : 'Start Your Reading Journey'
                }
              </Title>
              <Text style={{color: '#4A70A9', fontSize: '16px', display: 'block', marginBottom: 24}}>
                {searchTerm || statusFilter !== 'all' || genreFilter !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'Add your first book to begin tracking your reading progress'
                }
              </Text>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="primary" 
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={handleAddBook}
                  style={{
                    backgroundColor: '#4A70A9', 
                    borderColor: '#4A70A9',
                    borderRadius: '8px',
                    height: '48px',
                    fontSize: '16px'
                  }}
                >
                  Add Your First Book
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        )}

        {/* Add/Edit Book Modal */}
        <Modal
          title={editingBook ? 'Edit Book' : 'Add New Book'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          width={600}
          okButtonProps={{
            style: {backgroundColor: '#4A70A9', borderColor: '#4A70A9'}
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter book title' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="author"
                  label="Author"
                  rules={[{ required: true, message: 'Please enter author name' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="genre"
                  label="Genre"
                  rules={[{ required: true, message: 'Please select genre' }]}
                >
                  <Select>
                    <Option value="Fiction">Fiction</Option>
                    <Option value="Romance">Romance</Option>
                    <Option value="Mystery">Mystery</Option>
                    <Option value="Dystopian">Dystopian</Option>
                    <Option value="Biography">Biography</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <Select>
                    <Option value="Want to Read">Want to Read</Option>
                    <Option value="Reading">Reading</Option>
                    <Option value="Completed">Completed</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="pages" label="Pages">
                  <InputNumber min={1} style={{width: '100%'}} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="progress" label="Progress (%)">
                  <InputNumber min={0} max={100} style={{width: '100%'}} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="rating" label="Rating">
                  <Rate />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="cover" label="Cover Image URL">
              <Input placeholder="https://example.com/book-cover.jpg" />
            </Form.Item>

            <Form.Item name="notes" label="Notes">
              <TextArea rows={3} placeholder="Your thoughts about this book..." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </motion.div>
  );
};

export default MyBooks;