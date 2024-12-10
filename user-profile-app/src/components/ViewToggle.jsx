import React, { useEffect, useState } from "react";
import { Table, Button, Avatar, Spin, Alert, Empty } from "antd";
import {
  TableOutlined,
  AppstoreOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
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
      responsive: ["md"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      responsive: ["md"],
    },
    {
      title: "Website",
      dataIndex: "website",
      responsive: ["md"],
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      responsive: ["md"],
    },
  ];

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
    <div className="view-toggle-container">
      <style>
        {`
          .view-toggle-container {
            position: relative;
            width: 100%;
          }

          .view-toggle-buttons {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 16px;
            position: relative;
            z-index: 1;
          }

          @media screen and (max-width: 768px) {
            .view-toggle-buttons {
              position: fixed;
              bottom: 20px;
              right: 20px;
              margin-bottom: 0;
              z-index: 1000;
            }

            .view-toggle-buttons .ant-btn {
              padding: 8px 12px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .view-toggle-buttons .ant-btn span + span {
              display: none;
            }

            .view-toggle-buttons .ant-btn-group {
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
              border-radius: 4px;
              overflow: hidden;
            }
          }
        `}
      </style>

      <div className="view-toggle-buttons">
        <Button.Group>
          <Button
            type={!isTableView ? "primary" : "default"}
            icon={<AppstoreOutlined />}
            onClick={() => setIsTableView(false)}
          >
            <span>Card View</span>
          </Button>
          <Button
            type={isTableView ? "primary" : "default"}
            icon={<TableOutlined />}
            onClick={() => setIsTableView(true)}
          >
            <span>Table View</span>
          </Button>
        </Button.Group>
      </div>

      {isTableView ? (
        <Table
          dataSource={displayUsers}
          columns={columns}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: 12 }}>
                <p>Email: {record.email}</p>
                <p>Phone: {record.phone}</p>
                <p>Website: {record.website}</p>
                <p>Company: {record.company.name}</p>
              </div>
            ),
            expandIcon: ({ expanded, onExpand, record }) => {
              if (window.innerWidth > 480) return null;
              return expanded ? (
                <UpOutlined onClick={(e) => onExpand(record, e)} />
              ) : (
                <DownOutlined onClick={(e) => onExpand(record, e)} />
              );
            },
            columnWidth: 30,
            EXPAND_COLUMN: 6,
          }}
        />
      ) : !users.length || !displayUsers.length ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span style={{ fontSize: "16px", color: "#666" }}>
              No users found
            </span>
          }
        />
      ) : (
        <UserList />
      )}
    </div>
  );
};

export default ViewToggle;
