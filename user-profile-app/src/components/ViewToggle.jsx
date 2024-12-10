import React, { useEffect, useState } from "react";
import { Table, Button, Avatar, Spin, Alert, Empty } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/user/user.action";

const ViewToggle = () => {
  const [isTableView, setIsTableView] = useState(false);
  const dispatch = useDispatch();
  const { users, loading, error, filteredUsers, searchTerm } = useSelector(
    (state) => state.users
  );
  const displayUsers = searchTerm ? filteredUsers : users;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "username",
      render: (username) => (
        <Avatar
          src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${username}`}
          size="large"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
    },
  ];

  if (!users.length) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span style={{ fontSize: '16px', color: '#666' }}>
            No users found
          </span>
        }
      />
    );
  }

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
      <Button.Group style={{ marginBottom: 16 }}>
        <Button
          type={!isTableView ? "primary" : "default"}
          icon={<AppstoreOutlined />}
          onClick={() => setIsTableView(false)}
        >
          Card View
        </Button>
        <Button
          type={isTableView ? "primary" : "default"}
          icon={<TableOutlined />}
          onClick={() => setIsTableView(true)}
        >
          Table View
        </Button>
      </Button.Group>

      {isTableView ? (
        <Table dataSource={displayUsers} columns={columns} rowKey="id" />
      ) : (
        <UserList />
      )}
    </>
  );
};

export default ViewToggle;
