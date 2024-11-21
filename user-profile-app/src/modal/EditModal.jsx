import React from "react";
import { Modal, Form, Input } from "antd";

const EditModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={400}
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit}
        initialValues={initialValues}
        labelCol={{ span: 6 }} // Align labels
        wrapperCol={{ span: 18 }} // Align input fields
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input user name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input user email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: true,
              message: "Please input website!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
