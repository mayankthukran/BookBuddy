import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Rate, Tag, Spin, Tabs, Alert, Avatar, Divider, message, Tooltip, Space } from 'antd';
import { BookOutlined, StarOutlined, BulbOutlined, FireOutlined, HeartOutlined, TrophyOutlined, ReloadOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { getRecommendations } from '../services/recommendationService';
import { bookService } from '../services/bookService';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const RecommendationCard = ({ book, showReason = false }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <Card
      hoverable
      style={{
        height: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
      cover={
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <motion.img
            src={book.cover}
            alt={book.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            whileHover={{ scale: 1.1 }}
          />
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(0,0,0,0.8)',
            borderRadius: 20,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <StarOutlined style={{ color: '#FFD700', marginRight: 4, fontSize: 14 }} />
            <Text style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>
              {book.rating}
            </Text>
          </div>
        </div>
      }
      actions={[
        <Tooltip title="Add to your library">
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAddBook(book)}
            style={{
              backgroundColor: '#4A70A9',
              borderColor: '#4A70A9',
              borderRadius: 8,
              fontWeight: 600,
              height: 40,
              width: '90%'
            }}
          >
            Add to Library
          </Button>
        </Tooltip>
      ]}
    >
      <div style={{ padding: '8px 4px' }}>
        <Title level={5} style={{ 
          color: '#000000', 
          marginBottom: 8,
          height: 48,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          fontWeight: 600,
          lineHeight: '1.4'
        }}>
          {book.title}
        </Title>
        <Text style={{ 
          color: '#4A70A9', 
          fontWeight: 500,
          display: 'block',
          marginBottom: 8,
          fontSize: 14
        }}>
          by {book.author}
        </Text>
        <Tag 
          color="#8FABD4" 
          style={{ 
            marginBottom: 12, 
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 500
          }}
        >
          {book.genre}
        </Tag>
        <Text style={{ 
          color: '#666', 
          fontSize: 12,
          marginBottom: 8,
          lineHeight: '1.4',
          height: 32,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {book.description}
        </Text>
        {showReason && book.reason && (
          <div style={{
            background: 'linear-gradient(135deg, #8FABD4 0%, #4A70A9 100%)',
            borderRadius: 8,
            padding: '6px 10px',
            marginTop: 8
          }}>
            <Text style={{ 
              color: 'white', 
              fontSize: 11, 
              fontWeight: 500,
              fontStyle: 'italic'
            }}>
              💡 {book.reason}
            </Text>
          </div>
        )}
      </div>
    </Card>
  </motion.div>
);

const handleAddBook = async (book) => {
  try {
    await bookService.createBook({
      title: book.title,
      author: book.author,
      genre: book.genre,
      status: 'Want to Read',
      pages: Math.floor(Math.random() * 300) + 200,
      cover: book.cover,
      notes: book.description
    });
    message.success(`"${book.title}" added to your library!`);
  } catch (error) {
    message.error('Failed to add book to library');
  }
};

const Recommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState({
    ai: [],
    trending: [],
    similar: [],
    genres: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ai');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const data = await getRecommendations();
      setRecommendations(data);
    } catch (error) {
      message.error('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
                  icon={<BulbOutlined />}
                  style={{backgroundColor: '#4A70A9'}}
                />
                <div>
                  <Title 
                    level={2} 
                    className="font-display"
                    style={{color: '#000000', margin: 0}}
                  >
                    AI Recommendations for {user?.name}
                  </Title>
                  <Text style={{fontSize: '16px', color: '#4A70A9'}}>
                    Discover your next great read with personalized suggestions
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div style={{textAlign: 'right'}}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    icon={<ReloadOutlined />}
                    onClick={fetchRecommendations}
                    loading={loading}
                    style={{ 
                      backgroundColor: '#4A70A9',
                      borderColor: '#4A70A9',
                      borderRadius: 8,
                      height: 48,
                      fontSize: 16,
                      fontWeight: 600,
                      paddingLeft: 24,
                      paddingRight: 24
                    }}
                  >
                    Get New Recommendations
                  </Button>
                </motion.div>
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Recommendation Tabs */}
        <motion.div variants={itemVariants}>
          <Card style={{ 
            borderRadius: 16,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab} 
              size="large"
              items={[
                {
                  key: 'ai',
                  label: (
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      <BulbOutlined style={{ marginRight: 8 }} />
                      AI Recommendations
                    </span>
                  ),
                  children: (
                    <>
                      <Alert
                        message="Personalized for You"
                        description="These recommendations are generated using AI based on your reading history and preferences."
                        type="info"
                        showIcon
                        style={{ 
                          marginBottom: 32,
                          borderRadius: 12
                        }}
                      />
                      {loading ? (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                          <Spin size="large" />
                          <div style={{ marginTop: 24 }}>
                            <Text style={{ color: '#4A70A9', fontSize: 16 }}>
                              Analyzing your reading preferences...
                            </Text>
                          </div>
                        </div>
                      ) : (
                        <Row gutter={[24, 32]}>
                          {recommendations.ai.map((book) => (
                            <Col xs={24} sm={12} lg={8} xl={6} key={book.id}>
                              <RecommendationCard book={book} showReason={true} />
                            </Col>
                          ))}
                        </Row>
                      )}
                    </>
                  )
                },
                {
                  key: 'trending',
                  label: (
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      <FireOutlined style={{ marginRight: 8 }} />
                      Trending Now
                    </span>
                  ),
                  children: (
                    <>
                      <div style={{ marginBottom: 32 }}>
                        <Title level={3} style={{ color: '#000000', marginBottom: 8 }}>
                          What Everyone's Reading
                        </Title>
                        <Text style={{ color: '#4A70A9', fontSize: 16 }}>
                          Popular books trending in the BookBuddy community
                        </Text>
                      </div>
                      <Row gutter={[24, 32]}>
                        {recommendations.trending.map((book) => (
                          <Col xs={24} sm={12} lg={8} xl={6} key={book.id}>
                            <RecommendationCard book={book} showReason={true} />
                          </Col>
                        ))}
                      </Row>
                    </>
                  )
                },
                {
                  key: 'similar',
                  label: (
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      <HeartOutlined style={{ marginRight: 8 }} />
                      Similar to Your Favorites
                    </span>
                  ),
                  children: (
                    <>
                      <div style={{ marginBottom: 32 }}>
                        <Title level={3} style={{ color: '#000000', marginBottom: 8 }}>
                          More Like What You Love
                        </Title>
                        <Text style={{ color: '#4A70A9', fontSize: 16 }}>
                          Books similar to ones you've rated highly
                        </Text>
                      </div>
                      <Row gutter={[24, 32]}>
                        {recommendations.similar.map((book) => (
                          <Col xs={24} sm={12} lg={8} xl={6} key={book.id}>
                            <RecommendationCard book={book} showReason={true} />
                          </Col>
                        ))}
                      </Row>
                    </>
                  )
                },
                {
                  key: 'genres',
                  label: (
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      <TrophyOutlined style={{ marginRight: 8 }} />
                      Explore Genres
                    </span>
                  ),
                  children: (
                    <>
                      <div style={{ marginBottom: 32 }}>
                        <Title level={3} style={{ color: '#000000', marginBottom: 8 }}>
                          Discover New Genres
                        </Title>
                        <Text style={{ color: '#4A70A9', fontSize: 16 }}>
                          Expand your reading horizons with highly-rated books from different genres
                        </Text>
                      </div>
                      {recommendations.genres.map((genreGroup, index) => (
                        <div key={index} style={{ marginBottom: 48 }}>
                          <Title level={4} style={{ 
                            color: '#000000', 
                            marginBottom: 24,
                            fontSize: 20,
                            fontWeight: 600
                          }}>
                            📚 {genreGroup.genre}
                          </Title>
                          <Row gutter={[24, 32]}>
                            {genreGroup.books.map((book) => (
                              <Col xs={24} sm={12} lg={8} xl={6} key={book.id}>
                                <RecommendationCard book={book} />
                              </Col>
                            ))}
                          </Row>
                          {index < recommendations.genres.length - 1 && (
                            <Divider style={{ margin: '48px 0' }} />
                          )}
                        </div>
                      ))}
                    </>
                  )
                }
              ]}
            />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Recommendations;