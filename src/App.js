import { useState } from 'react'
import { Button, Table, Modal, Form, Input, Popconfirm } from 'antd'
import {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostsMutation,
  useGetPostsQuery,
} from './services/postService'
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  PlusOutlined,
} from '@ant-design/icons'
import useTableFilter from './hooks/useTableFilter'

const App = () => {
  const { data, isLoading } = useGetPostsQuery()
  const [editPost] = useEditPostsMutation()
  const [addPost] = useAddPostMutation()
  const [deletePost] = useDeletePostMutation()
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [rowData, setRowData] = useState(false)
  const filter = useTableFilter()
  const handleEdit = values => {
    const { title, author } = values
    editPost({ id: rowData.id, title, author })
    setIsEditModalVisible(false)
  }
  const handleAdd = values => {
    const { id, title, author } = values
    addPost({ id, title, author })
    setIsAddModalVisible(false)
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      align: 'center',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      align: 'center',
      ...filter('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      align: 'center',
      ...filter('author'),
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: 'Actions',
      render: data => (
        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
        >
          <Button
            type='primary'
            icon={<EyeFilled />}
            onClick={() => {
              setRowData(data)
              setIsViewModalVisible(true)
            }}
          />
          <Button
            icon={
              <EditFilled
                onClick={() => {
                  setRowData(data)
                  setIsEditModalVisible(true)
                }}
              />
            }
          />
          <Popconfirm
            placement='topRight'
            title='Are you sure to delete this post?'
            onConfirm={() => deletePost(data.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger icon={<DeleteFilled />} />
          </Popconfirm>
        </div>
      ),
      align: 'center',
    },
  ]
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Posts</h1>
      <Table
        dataSource={data}
        columns={columns}
        rowKey='id'
        bordered
        loading={isLoading}
        title={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>Posts</h2>
            <Button
              icon={<PlusOutlined />}
              type='primary'
              onClick={() => setIsAddModalVisible(true)}
            />
          </div>
        )}
      />

      {/* view */}
      <Modal
        title='Post Details'
        visible={isViewModalVisible}
        onOk={() => setIsViewModalVisible(false)}
        onCancel={() => setIsViewModalVisible(false)}
      >
        <div>Id: {rowData.id}</div>
        <div>Title: {rowData.title}</div>
        <div>Author: {rowData.author}</div>
      </Modal>

      {/* edit */}
      <Modal
        title='Edit Posts'
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key='1' htmlType='submit' form='editForm' type='primary'>
            Edit
          </Button>,
          <Button key='2' onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          id='editForm'
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            title: rowData.title,
            author: rowData.author,
          }}
          onFinish={handleEdit}
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Author'
            name='author'
            rules={[
              {
                required: true,
                message: 'Please input author!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* add */}
      <Modal
        title='Add Posts'
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={[
          <Button key='1' htmlType='submit' form='addForm' type='primary'>
            Add
          </Button>,
          <Button key='2' onClick={() => setIsAddModalVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          id='addForm'
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={handleAdd}
        >
          <Form.Item
            label='Id'
            name='id'
            rules={[
              {
                required: true,
                message: 'Please input id!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Author'
            name='author'
            rules={[
              {
                required: true,
                message: 'Please input author!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
