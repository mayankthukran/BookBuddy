import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
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
  InputNumber,
  Select,
  message,
  Modal,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined,
  BookOutlined,
  StarOutlined,
  FireOutlined,
  HeartOutlined,
  LockOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Thriller'];

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [profile, userStats] = await Promise.all([
        userService.getProfile(),
        userService.getUserStats()
      ]);
      
      setProfileData(profile);
      setStats(userStats);
      form.setFieldsValue(profile);
    } catch (error) {
      console.error('Error loading profile data:', error);
      message.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();
      const updatedProfile = await userService.updateProfile(values);
      setProfileData(updatedProfile);
      setIsEditing(false);
      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const values = await passwordForm.validateFields();
      await userService.updatePassword(values);
      setShowPasswordModal(false);
      passwordForm.resetFields();
      message.success('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      message.error('Failed to update password');
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#EFECE3'}}>
        <Spin size="large" />
      </div>
    );
  }

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
                    {profileData?.name}
                  </Title>
                  <Text style={{color: '#4A70A9'}}>
                    Member since {new Date(profileData?.createdAt).getFullYear()}
                  </Text>
                </div>
              </div>
              
              <Space className="mt-4 sm:mt-0">
                {isEditing ? (
                  <>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSave}
                      loading={saving}
                      style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}
                    >
                      Save
                    </Button>
                    <Button
                      icon={<CloseOutlined />}
                      onClick={() => {
                        form.setFieldsValue(profileData);
                        setIsEditing(false);
                      }}
                      style={{borderColor: '#8FABD4', color: '#4A70A9'}}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => setIsEditing(true)}
                      style={{borderColor: '#8FABD4', color: '#4A70A9'}}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      icon={<LockOutlined />}
                      onClick={() => setShowPasswordModal(true)}
                      style={{borderColor: '#8FABD4', color: '#4A70A9'}}
                    >
                      Change Password
                    </Button>
                  </>
                )}
              </Space>
            </div>

            {/* Profile Form */}
            <Form
              form={form}
              layout="vertical"
              initialValues={profileData}
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
                        {profileData?.name}
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
                        {profileData?.email}
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
                        placeholder="Tell us about yourself..."
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
                        {profileData?.bio || 'No bio added yet'}
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label={<Text strong style={{color: '#000000'}}>Favorite Genres</Text>}
                    name="favoriteGenres"
                  >
                    {isEditing ? (
                      <Select
                        mode="multiple"
                        placeholder="Select your favorite genres"
                        style={{ width: '100%' }}
                      >
                        {genres.map(genre => (
                          <Option key={genre} value={genre}>{genre}</Option>
                        ))}
                      </Select>
                    ) : (
                      <Space wrap>
                        {profileData?.favoriteGenres?.map((genre, index) => (
                          <Tag 
                            key={index}
                            color="#4A70A9"
                            style={{
                              fontSize: '14px',
                              padding: '4px 12px',
                              borderRadius: '20px'
                            }}
                          >
                            {genre}
                          </Tag>
                        )) || <Text style={{color: '#4A70A9'}}>No genres selected</Text>}
                      </Space>
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
                        {profileData?.readingGoal || 50} books
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </motion.div>

        {/* Reading Stats */}
        {stats && (
          <Row gutter={[24, 24]} style={{marginBottom: 24}}>
            {[
              { label: 'Total Books', value: stats.totalBooks, icon: BookOutlined, color: '#4A70A9' },
              { label: 'Completed', value: stats.completed, icon: StarOutlined, color: '#8FABD4' },
              { label: 'Reading Streak', value: stats.readingStreak, suffix: 'days', icon: FireOutlined, color: '#4A70A9' },
              { label: 'Avg Rating', value: stats.averageRating, icon: HeartOutlined, color: '#8FABD4' },
            ].map((stat, index) => (
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
        )}
      </div>

      {/* Password Change Modal */}
      <Modal
        title="Change Password"
        open={showPasswordModal}
        onOk={handlePasswordUpdate}
        onCancel={() => {
          setShowPasswordModal(false);
          passwordForm.resetFields();
        }}
        okText="Update Password"
        okButtonProps={{ style: { backgroundColor: '#4A70A9', borderColor: '#4A70A9' } }}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Profile;