import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Card, 
  Avatar, 
  Button, 
  Input, 
  Form, 
  Typography, 
  Row, 
  Col, 
  Space, 
  Tag, 
  Statistic,
  InputNumber
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined,
  BookOutlined,
  StarOutlined,
  FireOutlined,
  HeartOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate reader who loves exploring different genres and discovering new authors.',
    favoriteGenres: ['Fiction', 'Mystery', 'Biography'],
    readingGoal: 50
  });

  const stats = [
    { label: 'Books Read', value: 24, icon: BookOutlined, color: '#4A70A9' },
    { label: 'Reviews Written', value: 18, icon: StarOutlined, color: '#8FABD4' },
    { label: 'Reading Streak', value: 12, suffix: 'days', icon: FireOutlined, color: '#4A70A9' },
    { label: 'Favorite Genre', value: 'Fiction', icon: HeartOutlined, color: '#8FABD4' },
  ];

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

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setFormData(values);
      setIsEditing(false);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(formData);
    setIsEditing(false);
  };

  return (
    <motion.div 
      className="min-h-screen py-8" 
      style={{backgroundColor: '#EFECE3'}}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <Card 
            style={{
              borderColor: '#8FABD4',
              borderWidth: 2,
              borderRadius: 12,
              marginBottom: 24
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar 
                  size={80} 
                  icon={<UserOutlined />}
                  style={{backgroundColor: '#4A70A9'}}
                />
                <div>
                  <Title 
                    level={2} 
                    className="font-display"
                    style={{color: '#000000', margin: 0}}
                  >
                    {formData.name}
                  </Title>
                  <Text style={{color: '#4A70A9'}}>Member since 2024</Text>
                </div>
              </div>
              
              <Space className="mt-4 sm:mt-0">
                {isEditing ? (
                  <>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSave}
                      style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                    >
                      Save
                    </Button>
                    <Button
                      icon={<CloseOutlined />}
                      onClick={handleCancel}
                      style={{borderColor: '#8FABD4', color: '#4A70A9'}}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                    style={{borderColor: '#8FABD4', color: '#4A70A9'}}
                  >
                    Edit Profile
                  </Button>
                )}
              </Space>
            </div>

            {/* Profile Form */}
            <Form
              form={form}
              layout="vertical"
              initialValues={formData}
              onValuesChange={(_, values) => setFormData(values)}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<Text strong style={{color: '#000000'}}>Name</Text>}
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    {isEditing ? (
                      <Input 
                        style={{
                          borderColor: '#8FABD4',
                          backgroundColor: '#EFECE3'
                        }}
                      />
                    ) : (
                      <div 
                        className="p-3 rounded-lg" 
                        style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}
                      >
                        {formData.name}
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label={<Text strong style={{color: '#000000'}}>Email</Text>}
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                  >
                    {isEditing ? (
                      <Input 
                        style={{
                          borderColor: '#8FABD4',
                          backgroundColor: '#EFECE3'
                        }}
                      />
                    ) : (
                      <div 
                        className="p-3 rounded-lg" 
                        style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}
                      >
                        {formData.email}
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label={<Text strong style={{color: '#000000'}}>Bio</Text>}
                    name="bio"
                  >
                    {isEditing ? (
                      <TextArea 
                        rows={3}
                        style={{
                          borderColor: '#8FABD4',
                          backgroundColor: '#EFECE3'
                        }}
                      />
                    ) : (
                      <div 
                        className="p-3 rounded-lg" 
                        style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}
                      >
                        {formData.bio}
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label={<Text strong style={{color: '#000000'}}>Reading Goal (books/year)</Text>}
                    name="readingGoal"
                  >
                    {isEditing ? (
                      <InputNumber 
                        min={1}
                        max={365}
                        style={{
                          width: '100%',
                          borderColor: '#8FABD4',
                          backgroundColor: '#EFECE3'
                        }}
                      />
                    ) : (
                      <div 
                        className="p-3 rounded-lg" 
                        style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}
                      >
                        {formData.readingGoal} books
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </motion.div>

        {/* Reading Stats */}
        <Row gutter={[24, 24]} style={{marginBottom: 24}}>
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  style={{
                    borderColor: '#8FABD4',
                    borderWidth: 2,
                    borderRadius: 12,
                    textAlign: 'center'
                  }}
                >
                  <Avatar 
                    size={48} 
                    icon={<stat.icon />}
                    style={{backgroundColor: stat.color, marginBottom: 12}}
                  />
                  <Statistic
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{color: '#000000', fontSize: '20px', fontWeight: 'bold'}}
                  />
                  <Text style={{color: '#4A70A9', fontSize: '12px'}}>
                    {stat.label}
                  </Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Favorite Genres */}
        <motion.div variants={itemVariants}>
          <Card 
            title={
              <Title 
                level={3} 
                className="font-display"
                style={{color: '#000000', margin: 0}}
              >
                Favorite Genres
              </Title>
            }
            style={{
              borderColor: '#8FABD4',
              borderWidth: 2,
              borderRadius: 12
            }}
          >
            <Space wrap>
              {formData.favoriteGenres.map((genre, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Tag 
                    color="#4A70A9"
                    style={{
                      fontSize: '14px',
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}
                  >
                    {genre}
                  </Tag>
                </motion.div>
              ))}
            </Space>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;