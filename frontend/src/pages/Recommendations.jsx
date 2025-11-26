import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Tag, 
  Rate, 
  Spin,
  Empty,
  Tabs,
  Avatar,
  Divider,
  Alert
} from 'antd';
import { 
  BookOutlined, 
  StarOutlined, 
  HeartOutlined,
  TrophyOutlined,
  FireOutlined,
  BulbOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Recommendations = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('ai');
  const [recommendations, setRecommendations] = useState({
    ai: [],
    trending: [],
    similar: [],
    genres: []
  });

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

  // Mock data for recommendations
  const mockRecommendations = {
    ai: [
      {
        id: 1,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "Fiction",
        rating: 4.5,
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
        description: "A reclusive Hollywood icon finally tells her story to a young journalist.",
        reason: "Based on your love for character-driven fiction",
        pages: 400,
        publishYear: 2017
      },
      {
        id: 2,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        genre: "Mystery",
        rating: 4.3,
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
        description: "A mystery about a young woman who raised herself in the marshes of North Carolina.",
        reason: "Perfect match for your mystery preferences",
        pages: 384,
        publishYear: 2018
      },
      {
        id: 3,
        title: "Educated",
        author: "Tara Westover",
        genre: "Biography",
        rating: 4.7,
        cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
        description: "A memoir about education, family, and the struggle between loyalty and independence.",
        reason: "Recommended based on your reading history",
        pages: 334,
        publishYear: 2018
      }
    ],
    trending: [
      {
        id: 4,
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        genre: "Fantasy",
        rating: 4.6,
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
        description: "Dragons, war college, and a deadly curriculum.",
        trendReason: "Most read this month",
        pages: 500,
        publishYear: 2023
      },
      {
        id: 5,
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        genre: "Fiction",
        rating: 4.4,
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
        description: "A novel about friendship, art, and video game design.",
        trendReason: "Rising in popularity",
        pages: 416,
        publishYear: 2022
      }
    ],
    similar: [
      {
        id: 6,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Thriller",
        rating: 4.2,
        cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
        description: "A psychological thriller about a woman who refuses to speak.",
        similarTo: "Similar to books you've rated highly",
        pages: 336,
        publishYear: 2019
      }
    ],
    genres: [
      {
        genre: "Science Fiction",
        books: [
          {
            id: 7,
            title: "Klara and the Sun",
            author: "Kazuo Ishiguro",
            rating: 4.1,
            cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
            pages: 303
          },
          {
            id: 8,
            title: "Project Hail Mary",
            author: "Andy Weir",
            rating: 4.8,
            cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
            pages: 496
          }
        ]
      }
    ]
  };

  useEffect(() => {
    setRecommendations(mockRecommendations);
  }, []);

  const generateAIRecommendations = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In real app, this would call OpenAI API
    }, 2000);
  };

  const addToWantToRead = (book) => {
    // In real app, this would add to user's library
    console.log('Adding to want to read:', book.title);
  };

  const RecommendationCard = ({ book, showReason = false }) => (
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
        <Button 
          key="add" 
          type="primary" 
          size="small"
          onClick={() => addToWantToRead(book)}
          style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
        >
          Add to Library
        </Button>
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
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Tag color="blue">{book.genre}</Tag>
            <Rate disabled value={book.rating} allowHalf style={{fontSize: '12px'}} />
          </div>
          
          {book.description && (
            <Paragraph 
              ellipsis={{ rows: 2 }} 
              style={{color: '#4A70A9', fontSize: '12px', margin: 0}}
            >
              {book.description}
            </Paragraph>
          )}
          
          {showReason && (book.reason || book.trendReason || book.similarTo) && (
            <Alert
              message={book.reason || book.trendReason || book.similarTo}
              type="info"
              showIcon
              style={{fontSize: '11px', padding: '4px 8px'}}
            />
          )}
          
          <Text style={{color: '#4A70A9', fontSize: '11px'}}>
            {book.pages} pages • {book.publishYear}
          </Text>
        </Space>
      </div>
    </Card>
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
                Recommendations
              </Title>
              <Text style={{color: '#4A70A9', fontSize: '18px'}}>
                Discover your next great read with AI-powered suggestions
              </Text>
            </div>
            <Button 
              type="primary" 
              size="large" 
              icon={<ReloadOutlined />}
              onClick={generateAIRecommendations}
              loading={loading}
              style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9', marginTop: '16px'}}
            >
              Get New Recommendations
            </Button>
          </div>
        </motion.div>

        {/* Recommendation Tabs */}
        <motion.div variants={itemVariants}>
          <Card style={{borderColor: '#8FABD4', borderWidth: 2, borderRadius: 12}}>
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              size="large"
            >
              {/* AI Recommendations */}
              <TabPane 
                tab={
                  <span>
                    <BulbOutlined />
                    AI Recommendations
                  </span>
                } 
                key="ai"
              >
                <div style={{marginBottom: 16}}>
                  <Alert
                    message="Personalized for You"
                    description="These recommendations are generated based on your reading history, ratings, and preferences using advanced AI algorithms."
                    type="info"
                    showIcon
                    style={{marginBottom: 24}}
                  />
                </div>
                
                {loading ? (
                  <div style={{textAlign: 'center', padding: '60px 0'}}>
                    <Spin size="large" />
                    <div style={{marginTop: 16}}>
                      <Text style={{color: '#4A70A9'}}>
                        Analyzing your reading preferences...
                      </Text>
                    </div>
                  </div>
                ) : (
                  <Row gutter={[24, 24]}>
                    {recommendations.ai.map((book) => (
                      <Col xs={24} sm={12} lg={8} key={book.id}>
                        <motion.div 
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <RecommendationCard book={book} showReason={true} />
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                )}
              </TabPane>

              {/* Trending Books */}
              <TabPane 
                tab={
                  <span>
                    <FireOutlined />
                    Trending Now
                  </span>
                } 
                key="trending"
              >
                <div style={{marginBottom: 24}}>
                  <Title level={3} style={{color: '#000000'}}>
                    What Everyone's Reading
                  </Title>
                  <Text style={{color: '#4A70A9'}}>
                    Popular books that are trending in the BookBuddy community
                  </Text>
                </div>
                
                <Row gutter={[24, 24]}>
                  {recommendations.trending.map((book) => (
                    <Col xs={24} sm={12} lg={8} key={book.id}>
                      <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RecommendationCard book={book} showReason={true} />
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </TabPane>

              {/* Similar Books */}
              <TabPane 
                tab={
                  <span>
                    <HeartOutlined />
                    Similar to Your Favorites
                  </span>
                } 
                key="similar"
              >
                <div style={{marginBottom: 24}}>
                  <Title level={3} style={{color: '#000000'}}>
                    More Like What You Love
                  </Title>
                  <Text style={{color: '#4A70A9'}}>
                    Books similar to ones you've rated highly
                  </Text>
                </div>
                
                <Row gutter={[24, 24]}>
                  {recommendations.similar.map((book) => (
                    <Col xs={24} sm={12} lg={8} key={book.id}>
                      <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RecommendationCard book={book} showReason={true} />
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </TabPane>

              {/* Genre Exploration */}
              <TabPane 
                tab={
                  <span>
                    <TrophyOutlined />
                    Explore Genres
                  </span>
                } 
                key="genres"
              >
                <div style={{marginBottom: 24}}>
                  <Title level={3} style={{color: '#000000'}}>
                    Discover New Genres
                  </Title>
                  <Text style={{color: '#4A70A9'}}>
                    Expand your reading horizons with highly-rated books from different genres
                  </Text>
                </div>
                
                {recommendations.genres.map((genreGroup, index) => (
                  <div key={index} style={{marginBottom: 32}}>
                    <Title level={4} style={{color: '#000000', marginBottom: 16}}>
                      {genreGroup.genre}
                    </Title>
                    <Row gutter={[24, 24]}>
                      {genreGroup.books.map((book) => (
                        <Col xs={24} sm={12} lg={8} key={book.id}>
                          <motion.div 
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <RecommendationCard book={book} />
                          </motion.div>
                        </Col>
                      ))}
                    </Row>
                    {index < recommendations.genres.length - 1 && <Divider />}
                  </div>
                ))}
              </TabPane>
            </Tabs>
          </Card>
        </motion.div>

        {/* Reading Stats */}
        <motion.div variants={itemVariants} style={{marginTop: 32}}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card style={{textAlign: 'center', borderColor: '#8FABD4', borderWidth: 2}}>
                <Avatar 
                  size={48} 
                  icon={<BookOutlined />} 
                  style={{backgroundColor: '#4A70A9', marginBottom: 12}}
                />
                <Title level={3} style={{color: '#000000', margin: 0}}>24</Title>
                <Text style={{color: '#4A70A9'}}>Books Read This Year</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card style={{textAlign: 'center', borderColor: '#8FABD4', borderWidth: 2}}>
                <Avatar 
                  size={48} 
                  icon={<StarOutlined />} 
                  style={{backgroundColor: '#8FABD4', marginBottom: 12}}
                />
                <Title level={3} style={{color: '#000000', margin: 0}}>4.2</Title>
                <Text style={{color: '#4A70A9'}}>Average Rating</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card style={{textAlign: 'center', borderColor: '#8FABD4', borderWidth: 2}}>
                <Avatar 
                  size={48} 
                  icon={<TrophyOutlined />} 
                  style={{backgroundColor: '#4A70A9', marginBottom: 12}}
                />
                <Title level={3} style={{color: '#000000', margin: 0}}>8</Title>
                <Text style={{color: '#4A70A9'}}>Genres Explored</Text>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Recommendations;