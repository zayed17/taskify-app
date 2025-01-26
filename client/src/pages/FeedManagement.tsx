import React from 'react';
import { Form, Row, Col, Card, Image, Upload, Popconfirm } from 'antd';
import { AuthInput, AuthButton } from '../components/Auth';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useFeed } from '../hooks/useFeed'; 

const FeedManagement: React.FC = () => {
  const [feedForm] = Form.useForm();


  const {
    feeds,
    isLoading,
    error,
    imagePreview,
    beforeUpload,
    onFinish,
    onDelete,
  } = useFeed();

  if (isLoading) return <Loader />;

  if (error) return <div>Error fetching feeds!</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Feed Management</h1>


        <div className="mb-8">
          <Form form={feedForm} onFinish={onFinish} layout="vertical" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="image"
                  label="Upload Image"
                  rules={[{ required: true, message: 'Please upload an image!' }]}
                >
                  <Upload
                    name="image"
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                  >
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                    ) : (
                      <div>
                        <p className="text-gray-500">Click to upload</p>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <AuthInput name="caption" label="Caption" placeholder="Enter caption" />
              </Col>
            </Row>
            <AuthButton loading={isLoading} text="Add Feed" />
          </Form>
        </div>


        <Row gutter={[32, 32]} className="p-6">
          {feeds.map((feed: any) => (
            <Col key={feed._id} span={8}>
              <Card
                className="shadow-md hover:shadow-lg transition-shadow"
                cover={<Image src={feed.imageUrl} alt={feed.caption} className="h-48 object-cover" />}
                actions={[
                    <Popconfirm
                    title="Are you sure you want to delete this feed?"
                    onConfirm={() => onDelete(feed._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </Popconfirm>
                ]}
              >
                <Card.Meta description={feed.caption} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default FeedManagement;