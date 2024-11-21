import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Typography, Space, Spin, Alert, Tooltip } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HomeOutlined,
  BankOutlined,
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteUser, fetchUsers, updateUser } from "../redux/user/user.action";
import EditModal from "../modal/EditModal";

const { Text } = Typography;

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLikeToggle = (userId) => {
    setLikedUsers((prevLikedUsers) =>
      prevLikedUsers.includes(userId)
        ? prevLikedUsers.filter((id) => id !== userId)
        : [...prevLikedUsers, userId]
    );
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditModalVisible(true);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleCancel = () => {
    setEditModalVisible(false);
    setCurrentUser(null);
  };

  const handleUserUpdate = (updatedUser) => {
    dispatch(
      updateUser({
        id: currentUser.id,
        ...updatedUser,
      })
    );
    setEditModalVisible(false);
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin size="large" className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <>
      <div
        className="user-list-container"
        style={{ padding: "16px", overflow: "hidden" }}
      >
        <Row gutter={[16, 16]} className="user-list">
          {users.map((user) => (
            <Col
              key={user.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              className="user-col"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                cover={
                  <div
                    className="user-avatar-container"
                    style={{
                      backgroundColor: "lightgray",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      alt="background"
                      src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`}
                      className="user-avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                }
                actions={[
                  <Tooltip title="Like">
                    {likedUsers.includes(user.id) ? (
                      <HeartFilled
                        className="liked"
                        onClick={() => handleLikeToggle(user.id)}
                        style={{ color: "red" }}
                      />
                    ) : (
                      <HeartOutlined
                        onClick={() => handleLikeToggle(user.id)}
                      />
                    )}
                  </Tooltip>,
                  <Tooltip title="Edit">
                    <EditOutlined onClick={() => handleEdit(user)} />
                  </Tooltip>,
                  <Tooltip title="Delete">
                    <DeleteOutlined
                      className="delete-icon"
                      onClick={() => handleDelete(user.id)}
                    />
                  </Tooltip>,
                ]}
                style={{ width: "100%" }}
              >
                <div
                  className="user-profile"
                  style={{ textAlign: "left", marginBottom: "12px" }}
                >
                  <Text strong className="user-name">
                    {user.name}
                  </Text>
                </div>
                <div style={{ textAlign: "left" }}>
                  <Space
                    direction="vertical"
                    className="user-info"
                    style={{ textAlign: "left" }}
                  >
                    <Space>
                      <MailOutlined />
                      <Text type="secondary">{user.email}</Text>
                    </Space>
                    <Space>
                      <PhoneOutlined />
                      <Text type="secondary">{user.phone}</Text>
                    </Space>
                    <Space>
                      <GlobalOutlined />
                      <Text type="secondary">{user.website}</Text>
                    </Space>
                    <Space>
                      <HomeOutlined />
                      <Text type="secondary">{user.address.street}</Text>
                    </Space>
                    <Space>
                      <BankOutlined />
                      <Text type="secondary">{user.company.name}</Text>
                    </Space>
                  </Space>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <EditModal
        visible={editModalVisible}
        onCancel={handleCancel}
        onSubmit={handleUserUpdate}
        initialValues={
          currentUser
            ? {
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone,
                website: currentUser.website,
              }
            : {}
        }
      />
    </>
  );
};

export default UserList;
