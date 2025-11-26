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
  Spin,
  Progress,
  Divider,
  Badge,
  Tooltip,
  Upload,
  Image
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
  LockOutlined,
  TrophyOutlined,
  CalendarOutlined,
  MailOutlined,
  ReadOutlined,
  AimOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
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
  const [showImageModal, setShowImageModal] = useState(false);

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
      console.log('Form values being sent:', values);
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

  const readingProgress = stats ? Math.round((stats.completed / (profileData?.readingGoal || 50)) * 100) : 0;
  const memberSince = new Date(profileData?.createdAt).getFullYear();

  return (
    <motion.div 
      className="min-h-screen" 
      style={{
        background: `linear-gradient(135deg, rgba(239, 236, 227, 0.9) 0%, rgba(239, 236, 227, 0.95) 100%), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Background */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card
            style={{
              borderColor: '#8FABD4',
              borderWidth: 2,
              borderRadius: 16,
              background: `linear-gradient(135deg, rgba(74, 112, 169, 0.9) 0%, rgba(143, 171, 212, 0.9) 100%), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 32px rgba(74, 112, 169, 0.2)',
              padding: '40px 24px'
            }}
          >
            <div className="text-center">
              <Title level={1} className="font-display" style={{color: '#ffffff', marginBottom: 8, textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                My Profile
              </Title>
              <Text style={{color: '#ffffff', fontSize: '18px', textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                Manage your account settings and reading preferences
              </Text>
            </div>
          </Card>
        </motion.div>

        <Row gutter={[24, 24]}>
          {/* Left Column - Profile Info */}
          <Col xs={24} lg={16}>
            {/* Profile Card */}
            <motion.div variants={itemVariants}>
              <Card 
                style={{
                  borderColor: '#8FABD4',
                  borderWidth: 2,
                  borderRadius: 16,
                  marginBottom: 24,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 8px 32px rgba(74, 112, 169, 0.15)'
                }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <Badge.Ribbon text={`Member since ${memberSince}`} color="#4A70A9">
                      <div className="relative">
                        <Avatar 
                          size={100} 
                          src={profileData?.profilePhoto}
                          icon={!profileData?.profilePhoto && <UserOutlined />}
                          style={{
                            backgroundColor: '#4A70A9',
                            border: '4px solid #8FABD4',
                            boxShadow: '0 4px 16px rgba(74, 112, 169, 0.3)',
                            cursor: profileData?.profilePhoto ? 'pointer' : 'default'
                          }}
                          onClick={() => profileData?.profilePhoto && setShowImageModal(true)}
                        />
                        {isEditing && (
                          <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={(file) => {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                const photoData = e.target.result;
                                setProfileData(prev => ({...prev, profilePhoto: photoData}));
                                form.setFieldsValue({...form.getFieldsValue(), profilePhoto: photoData});
                              };
                              reader.readAsDataURL(file);
                              return false;
                            }}
                          >
                            <Button
                              size="small"
                              icon={<EditOutlined />}
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                backgroundColor: '#4A70A9',
                                borderColor: '#4A70A9',
                                color: 'white'
                              }}
                            />
                          </Upload>
                        )}
                      </div>
                    </Badge.Ribbon>
                    <div>
                      <Title 
                        level={2} 
                        className="font-display"
                        style={{color: '#000000', margin: 0, marginBottom: 8}}
                      >
                        {profileData?.name}
                      </Title>
                      <Space direction="vertical" size={4}>
                        <div className="flex items-center space-x-2">
                          <MailOutlined style={{color: '#4A70A9'}} />
                          <Text style={{color: '#4A70A9'}}>{profileData?.email}</Text>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarOutlined style={{color: '#4A70A9'}} />
                          <Text style={{color: '#4A70A9'}}>
                            Joined {new Date(profileData?.createdAt).toLocaleDateString()}
                          </Text>
                        </div>
                      </Space>
                    </div>
                  </div>
                  
                  <Space className="mt-4 sm:mt-0" direction="vertical">
                    {isEditing ? (
                      <Space>
                        <Button
                          type="primary"
                          icon={<SaveOutlined />}
                          onClick={handleSave}
                          loading={saving}
                          size="large"
                          style={{
                            backgroundColor: '#4A70A9', 
                            borderColor: '#4A70A9',
                            borderRadius: 8,
                            boxShadow: '0 4px 12px rgba(74, 112, 169, 0.3)'
                          }}
                        >
                          Save Changes
                        </Button>
                        <Button
                          icon={<CloseOutlined />}
                          onClick={() => {
                            form.setFieldsValue(profileData);
                            setIsEditing(false);
                          }}
                          size="large"
                          style={{borderColor: '#8FABD4', color: '#4A70A9', borderRadius: 8}}
                        >
                          Cancel
                        </Button>
                      </Space>
                    ) : (
                      <Space>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => setIsEditing(true)}
                          size="large"
                          style={{
                            borderColor: '#8FABD4', 
                            color: '#4A70A9', 
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                          }}
                        >
                          Edit Profile
                        </Button>
                        <Button
                          icon={<LockOutlined />}
                          onClick={() => setShowPasswordModal(true)}
                          size="large"
                          style={{
                            borderColor: '#8FABD4', 
                            color: '#4A70A9', 
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                          }}
                        >
                          Change Password
                        </Button>
                      </Space>
                    )}
                  </Space>
                </div>

                <Divider style={{borderColor: '#8FABD4'}} />

                {/* Profile Form */}
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={profileData}
                >
                  <Form.Item name="profilePhoto" style={{display: 'none'}}>
                    <Input />
                  </Form.Item>
                  <Row gutter={[24, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<Text strong style={{color: '#000000', fontSize: '16px'}}>Full Name</Text>}
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        {isEditing ? (
                          <Input 
                            size="large"
                            prefix={<UserOutlined style={{color: '#8FABD4'}} />}
                            style={{
                              borderColor: '#8FABD4',
                              borderRadius: 8,
                              backgroundColor: '#EFECE3'
                            }}
                          />
                        ) : (
                          <div 
                            className="p-4 rounded-lg flex items-center space-x-2" 
                            style={{backgroundColor: '#EFECE3', border: '1px solid #8FABD4'}}
                          >
                            <UserOutlined style={{color: '#8FABD4'}} />
                            <Text style={{color: '#4A70A9', fontSize: '16px'}}>{profileData?.name}</Text>
                          </div>
                        )}
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<Text strong style={{color: '#000000', fontSize: '16px'}}>Email Address</Text>}
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                      >
                        {isEditing ? (
                          <Input 
                            size="large"
                            prefix={<MailOutlined style={{color: '#8FABD4'}} />}
                            style={{
                              borderColor: '#8FABD4',
                              borderRadius: 8,
                              backgroundColor: '#EFECE3'
                            }}
                          />
                        ) : (
                          <div 
                            className="p-4 rounded-lg flex items-center space-x-2" 
                            style={{backgroundColor: '#EFECE3', border: '1px solid #8FABD4'}}
                          >
                            <MailOutlined style={{color: '#8FABD4'}} />
                            <Text style={{color: '#4A70A9', fontSize: '16px'}}>{profileData?.email}</Text>
                          </div>
                        )}
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        label={<Text strong style={{color: '#000000', fontSize: '16px'}}>About Me</Text>}
                        name="bio"
                      >
                        {isEditing ? (
                          <TextArea 
                            rows={4}
                            placeholder="Tell us about your reading journey, favorite authors, or what inspires you to read..."
                            style={{
                              borderColor: '#8FABD4',
                              borderRadius: 8,
                              backgroundColor: '#EFECE3'
                            }}
                          />
                        ) : (
                          <div 
                            className="p-4 rounded-lg" 
                            style={{backgroundColor: '#EFECE3', border: '1px solid #8FABD4', minHeight: '80px'}}
                          >
                            <Text style={{color: '#4A70A9', fontSize: '16px', lineHeight: '1.6'}}>
                              {profileData?.bio || 'No bio added yet. Share something about your reading journey!'}
                            </Text>
                          </div>
                        )}
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<Text strong style={{color: '#000000', fontSize: '16px'}}>Favorite Genres</Text>}
                        name="favoriteGenres"
                      >
                        {isEditing ? (
                          <Select
                            mode="multiple"
                            size="large"
                            placeholder="Select your favorite genres"
                            style={{ width: '100%' }}
                            maxTagCount={3}
                          >
                            {genres.map(genre => (
                              <Option key={genre} value={genre}>{genre}</Option>
                            ))}
                          </Select>
                        ) : (
                          <div className="p-4 rounded-lg" style={{backgroundColor: '#EFECE3', border: '1px solid #8FABD4'}}>
                            <Space wrap>
                              {profileData?.favoriteGenres?.map((genre, index) => (
                                <Tag 
                                  key={index}
                                  color="#4A70A9"
                                  style={{
                                    fontSize: '14px',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: 'none'
                                  }}
                                >
                                  {genre}
                                </Tag>
                              )) || <Text style={{color: '#4A70A9'}}>No genres selected</Text>}
                            </Space>
                          </div>
                        )}
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<Text strong style={{color: '#000000', fontSize: '16px'}}>Annual Reading Goal</Text>}
                        name="readingGoal"
                      >
                        {isEditing ? (
                          <InputNumber 
                            min={1}
                            max={365}
                            size="large"
                            prefix={<AimOutlined />}
                            suffix="books"
                            style={{
                              width: '100%',
                              borderColor: '#8FABD4',
                              borderRadius: 8,
                              backgroundColor: '#EFECE3'
                            }}
                          />
                        ) : (
                          <div 
                            className="p-4 rounded-lg flex items-center justify-between" 
                            style={{backgroundColor: '#EFECE3', border: '1px solid #8FABD4'}}
                          >
                            <div className="flex items-center space-x-2">
                              <AimOutlined style={{color: '#8FABD4'}} />
                              <Text style={{color: '#4A70A9', fontSize: '16px'}}>
                                {profileData?.readingGoal || 50} books per year
                              </Text>
                            </div>
                            <Progress 
                              percent={readingProgress} 
                              size="small" 
                              strokeColor="#4A70A9"
                              style={{width: '100px'}}
                            />
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </motion.div>
          </Col>

          {/* Right Column - Stats & Achievements */}
          <Col xs={24} lg={8}>
            {/* Reading Stats */}
            {stats && (
              <motion.div variants={itemVariants}>
                <Card 
                  title={
                    <div className="flex items-center space-x-2">
                      <TrophyOutlined style={{color: '#4A70A9'}} />
                      <Title level={4} style={{color: '#000000', margin: 0}}>
                        Reading Statistics
                      </Title>
                    </div>
                  }
                  style={{
                    borderColor: '#8FABD4',
                    borderWidth: 2,
                    borderRadius: 16,
                    marginBottom: 24,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 8px 32px rgba(74, 112, 169, 0.1)'
                  }}
                >
                  <Space direction="vertical" size={16} style={{width: '100%'}}>
                    {[
                      { 
                        label: 'Total Books', 
                        value: stats.totalBooks, 
                        icon: BookOutlined, 
                        color: '#4A70A9',
                        description: 'Books in library'
                      },
                      { 
                        label: 'Completed', 
                        value: stats.completed, 
                        icon: StarOutlined, 
                        color: '#8FABD4',
                        description: 'Books finished'
                      },
                      { 
                        label: 'Currently Reading', 
                        value: stats.reading, 
                        icon: ReadOutlined, 
                        color: '#4A70A9',
                        description: 'Active reads'
                      },
                      { 
                        label: 'Reading Streak', 
                        value: stats.readingStreak, 
                        suffix: 'days', 
                        icon: FireOutlined, 
                        color: '#8FABD4',
                        description: 'Consecutive days'
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card 
                          size="small"
                          style={{
                            borderColor: stat.color,
                            borderRadius: 12,
                            background: `linear-gradient(135deg, ${stat.color}10 0%, ${stat.color}05 100%)`
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar 
                                size={40} 
                                icon={<stat.icon />}
                                style={{backgroundColor: stat.color}}
                              />
                              <div>
                                <Text style={{color: '#000000', fontSize: '18px', fontWeight: 'bold'}}>
                                  {stat.value}{stat.suffix}
                                </Text>
                                <br />
                                <Text style={{color: '#4A70A9', fontSize: '12px'}}>
                                  {stat.description}
                                </Text>
                              </div>
                            </div>
                            <ArrowUpOutlined style={{color: stat.color, fontSize: '16px'}} />
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </Space>
                </Card>
              </motion.div>
            )}

            {/* Reading Goal Progress */}
            <motion.div variants={itemVariants}>
              <Card 
                title={
                  <div className="flex items-center space-x-2">
                    <AimOutlined style={{color: '#4A70A9'}} />
                    <Title level={4} style={{color: '#000000', margin: 0}}>
                      Reading Goal Progress
                    </Title>
                  </div>
                }
                style={{
                  borderColor: '#8FABD4',
                  borderWidth: 2,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 32px rgba(74, 112, 169, 0.1)'
                }}
              >
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={readingProgress}
                    size={120}
                    strokeColor={{
                      '0%': '#8FABD4',
                      '100%': '#4A70A9',
                    }}
                    format={() => (
                      <div>
                        <div style={{fontSize: '24px', fontWeight: 'bold', color: '#4A70A9'}}>
                          {stats?.completed || 0}
                        </div>
                        <div style={{fontSize: '12px', color: '#8FABD4'}}>
                          of {profileData?.readingGoal || 50}
                        </div>
                      </div>
                    )}
                  />
                  <div className="mt-4">
                    <Text style={{color: '#4A70A9', fontSize: '16px'}}>
                      {readingProgress >= 100 ? '🎉 Goal Achieved!' : `${(profileData?.readingGoal || 50) - (stats?.completed || 0)} books to go!`}
                    </Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* Password Change Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <LockOutlined style={{color: '#4A70A9'}} />
            <span>Change Password</span>
          </div>
        }
        open={showPasswordModal}
        onOk={handlePasswordUpdate}
        onCancel={() => {
          setShowPasswordModal(false);
          passwordForm.resetFields();
        }}
        okText="Update Password"
        okButtonProps={{ 
          style: { 
            backgroundColor: '#4A70A9', 
            borderColor: '#4A70A9',
            borderRadius: 8
          } 
        }}
        cancelButtonProps={{
          style: {
            borderColor: '#8FABD4',
            color: '#4A70A9',
            borderRadius: 8
          }
        }}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password 
              size="large"
              style={{borderRadius: 8}}
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password 
              size="large"
              style={{borderRadius: 8}}
            />
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
            <Input.Password 
              size="large"
              style={{borderRadius: 8}}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Profile Image View Modal */}
      <Modal
        title="Profile Photo"
        open={showImageModal}
        onCancel={() => setShowImageModal(false)}
        footer={null}
        centered
        width={400}
      >
        <div className="text-center">
          <Image
            src={profileData?.profilePhoto}
            alt="Profile Photo"
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              borderRadius: 8
            }}
          />
        </div>
      </Modal>
      </div>
    </motion.div>
  );
};

export default Profile;