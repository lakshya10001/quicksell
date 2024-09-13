import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../Actions/DataAction";

// Helper functions to get group and order values from localStorage
const getLocalStorageValue = (key, defaultValue) => {
  return localStorage.getItem(key) || defaultValue;
};

const NavBar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  
  const [groupValue, setGroupValue] = useState(() => getLocalStorageValue("group", "status"));
  const [orderValue, setOrderValue] = useState(() => getLocalStorageValue("order", "priority"));

  const handleGroupValue = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroupValue(value);
      localStorage.setItem("group", value);
    } else {
      setOrderValue(value);
      localStorage.setItem("order", value);
    }
    setDisplayOnClick(!displayOnClick);
  };

  useEffect(() => {
    const dataToDispatch = groupValue === "user" ? { allTickets, allUser } : allTickets;
    dispatch(selectData(groupValue, dataToDispatch, orderValue));
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  return (
    <div className="top-header" style={{ paddingLeft: "10px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <TiThList /> Display
        </button>
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
