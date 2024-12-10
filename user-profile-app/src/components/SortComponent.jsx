import React, { useState } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { resetSort, sortUsers } from "../redux/user/user.action";

const { Option } = Select;

const SortComponent = () => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();

  const handleFieldChange = (field) => {
    setSortField(field);
    if (!field) {
      dispatch(resetSort());
    } else {
      dispatch(sortUsers({ field, order: sortOrder }));
    }
  };

  const handleOrderChange = (order) => {
    setSortOrder(order);
    if (sortField) {
      dispatch(sortUsers({ field: sortField, order }));
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Select
        style={{ width: 150 }}
        placeholder="Sort by"
        value={sortField}
        onChange={handleFieldChange}
        allowClear
      >
        <Option value="">Sort By</Option>
        <Option value="company">Company</Option>
        <Option value="email">Email</Option>
      </Select>

      <Select
        style={{ width: 120 }}
        placeholder="Order"
        value={sortOrder}
        onChange={handleOrderChange}
        disabled={!sortField}
      >
        <Option value="asc">Low to High</Option>
        <Option value="desc">High to Low</Option>
      </Select>
    </div>
  );
};

export default SortComponent;
