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
  Pagination
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  BookOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
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

  // Mock data - replace with API calls
  const mockBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      status: "Completed",
      rating: 4,
      progress: 100,
      pages: 180,
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
      notes: "A masterpiece of American literature",
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      status: "Reading",
      rating: 0,
      progress: 65,
      pages: 281,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      notes: "Powerful story about justice and morality",
      dateAdded: "2024-02-01"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      status: "Want to Read",
      rating: 0,
      progress: 0,
      pages: 328,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
      notes: "",
      dateAdded: "2024-02-10"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      status: "Completed",
      rating: 5,
      progress: 100,
      pages: 432,
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
      notes: "Brilliant character development",
      dateAdded: "2024-01-20"
    }
  ];

  useEffect(() => {
    setBooks(mockBooks);
    setFilteredBooks(mockBooks);
  }, []);

  useEffect(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
      const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;
      
      return matchesSearch && matchesStatus && matchesGenre;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return b.rating - a.rating;
        case 'dateAdded':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
    setCurrentPage(1);
  }, [books, searchTerm, statusFilter, genreFilter, sortBy]);

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
      onOk: () => {
        setBooks(books.filter(book => book.id !== bookId));
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingBook) {
        // Update existing book
        setBooks(books.map(book => 
          book.id === editingBook.id 
            ? { ...book, ...values }
            : book
        ));
      } else {
        // Add new book
        const newBook = {
          id: Date.now(),
          ...values,
          dateAdded: new Date().toISOString().split('T')[0]
        };
        setBooks([...books, newBook]);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
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

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <Title level={1} className="font-display" style={{color: '#000000', margin: 0}}>
                My Books
              </Title>
              <Text style={{color: '#4A70A9', fontSize: '18px'}}>
                Manage your personal library ({filteredBooks.length} books)
              </Text>
            </div>
            <Button 
              type="primary" 
              size="large" 
              icon={<PlusOutlined />}
              onClick={handleAddBook}
              style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9', marginTop: '16px'}}
            >
              Add Book
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <Card style={{marginBottom: 24, borderColor: '#8FABD4', borderWidth: 2}}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={6}>
                <Input
                  placeholder="Search books or authors..."
                  prefix={<SearchOutlined />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{borderColor: '#8FABD4'}}
                />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{width: '100%', borderColor: '#8FABD4'}}
                  placeholder="Status"
                >
                  <Option value="all">All Status</Option>
                  <Option value="Reading">Reading</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Want to Read">Want to Read</Option>
                </Select>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Select
                  value={genreFilter}
                  onChange={setGenreFilter}
                  style={{width: '100%'}}
                  placeholder="Genre"
                >
                  <Option value="all">All Genres</Option>
                  <Option value="Fiction">Fiction</Option>
                  <Option value="Romance">Romance</Option>
                  <Option value="Dystopian">Dystopian</Option>
                  <Option value="Mystery">Mystery</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  style={{width: '100%'}}
                  placeholder="Sort by"
                >
                  <Option value="title">Title</Option>
                  <Option value="author">Author</Option>
                  <Option value="rating">Rating</Option>
                  <Option value="dateAdded">Date Added</Option>
                </Select>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Books Grid */}
        {paginatedBooks.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {paginatedBooks.map((book, index) => (
                <Col xs={24} sm={12} lg={8} xl={6} key={book.id}>
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      hoverable
                      style={{
                        borderColor: '#8FABD4',
                        borderWidth: 2,
                        borderRadius: 12,
                        height: '100%'
                      }}
                      cover={
                        <div style={{height: 200, overflow: 'hidden', borderRadius: '12px 12px 0 0'}}>
                          <img 
                            src={book.cover} 
                            alt={book.title}
                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjOEZBQkQ0Ii8+CjxwYXRoIGQ9Ik0xMDAgMTUwQzExMC40NTcgMTUwIDExOSAxNDEuNDU3IDExOSAxMzFDMTE5IDEyMC41NDMgMTEwLjQ1NyAxMTIgMTAwIDExMkM4OS41NDMxIDExMiA4MSAxMjAuNTQzIDgxIDEzMUM4MSAxNDEuNDU3IDg5LjU0MzEgMTUwIDEwMCAxNTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                      }
                      actions={[
                        <EditOutlined key="edit" onClick={() => handleEditBook(book)} />,
                        <DeleteOutlined key="delete" onClick={() => handleDeleteBook(book.id)} />
                      ]}
                    >
                      <div style={{padding: '8px 0'}}>
                        <Title level={5} style={{color: '#000000', margin: 0, marginBottom: 4}}>
                          {book.title}
                        </Title>
                        <Text style={{color: '#4A70A9', display: 'block', marginBottom: 8}}>
                          by {book.author}
                        </Text>
                        
                        <Space direction="vertical" size="small" style={{width: '100%'}}>
                          <Tag color={getStatusColor(book.status)}>{book.status}</Tag>
                          
                          {book.status === 'Reading' && (
                            <div>
                              <Text style={{color: '#000000', fontSize: '12px'}}>
                                Progress: {book.progress}%
                              </Text>
                              <Progress 
                                percent={book.progress} 
                                size="small" 
                                strokeColor="#4A70A9"
                                showInfo={false}
                              />
                            </div>
                          )}
                          
                          {book.rating > 0 && (
                            <Rate disabled value={book.rating} style={{fontSize: '14px'}} />
                          )}
                          
                          <Text style={{color: '#4A70A9', fontSize: '12px'}}>
                            {book.pages} pages • {book.genre}
                          </Text>
                        </Space>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div style={{textAlign: 'center', marginTop: 32}}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredBooks.length}
                onChange={setCurrentPage}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => 
                  `${range[0]}-${range[1]} of ${total} books`
                }
              />
            </div>
          </>
        ) : (
          <motion.div variants={itemVariants}>
            <Empty
              image={<BookOutlined style={{fontSize: 64, color: '#8FABD4'}} />}
              description={
                <Text style={{color: '#4A70A9'}}>
                  {searchTerm || statusFilter !== 'all' || genreFilter !== 'all' 
                    ? 'No books match your filters' 
                    : 'No books in your library yet'
                  }
                </Text>
              }
            >
              <Button 
                type="primary" 
                onClick={handleAddBook}
                style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
              >
                Add Your First Book
              </Button>
            </Empty>
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