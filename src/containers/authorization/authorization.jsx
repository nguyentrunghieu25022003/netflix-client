import classNames from "classnames/bind";
import styles from "./authorization.module.scss";
import { fetchAllUsers } from "../../api/index";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading/loading";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const cx = classNames.bind(styles);

const Authorization = () => {
  const [users, setUsers] = useState([]);
  const [idList, setIdList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let isChecked = false;

  const getAllUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChecked = (event) => {
    const userId = event.target.value;
    const index = idList.findIndex((id) => id === userId);
    const currentArray = idList;
    if (index !== -1) {
      const update = currentArray.filter((id) => id !== userId);
      setIdList(update);
    } else {
      const update = [...currentArray, userId];
      setIdList(update);
    }
  };

  const handleLocked = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/lock`,
        {
          userIdList: idList,
        }
      );
      if (response.status === 200) {
        console.log("Success");
        await getAllUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlocked = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/unlock`,
        {
          userIdList: idList,
        }
      );
      if (response.status === 200) {
        console.log("Success");
        await getAllUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckAll = () => {
    try {
      const inputList = document.querySelectorAll("input[name='userId']");
      const tmp = [];
      if (!isChecked && inputList.length > idList.length) {
        inputList.forEach((input) => {
          input.checked = true;
          isChecked = true;
          tmp.push(input.value);
        });
        setIdList(tmp);
      } else {
        inputList.forEach((input) => {
          input.checked = false;
          isChecked = false;
        });
        setIdList([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [users.length]);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("authorization")}>
      <h3>Authorization</h3>
      <div className="d-flex align-items-center justify-content-between">
        <form className={cx("search-box")}>
          <input type="text" placeholder="Search...." />
          <button type="submit">
            <SearchIcon className={cx("icon")} />
          </button>
        </form>
        <div className={cx("btn-group")}>
          <button
            style={{
              backgroundColor: "#999",
              border: "1px solid var(--text-color)",
            }}
            onClick={handleCheckAll}
          >
            Check all
          </button>
          <form onSubmit={handleLocked}>
            <input type="hidden" name="userIdList" value={idList} />
            <button type="submit">Lock</button>
          </form>
          <form onSubmit={handleUnlocked}>
            <input type="hidden" name="userIdList" value={idList} />
            <button type="submit" className={cx("btn-lasted")}>
              Unlock
            </button>
          </form>
        </div>
      </div>
      <table className={cx("table-custom")}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Create at</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            if (user.role !== "admin") {
              const date = new Date(user.createAt);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);
              return (
                <tr key={user._id} className={cx("tb-row")}>
                  <th scope="row" className={cx("check")}>
                    <input
                      type="checkbox"
                      value={user._id}
                      name="userId"
                      onChange={handleChecked}
                      className="form-check-input mb-2"
                    />
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "user" && (
                      <AccountBoxIcon className={cx("user-icon")} />
                    )}
                  </td>
                  <td>
                    {!user.isLocked ? (
                      <LockOpenIcon className={cx("is-lock-icon")} />
                    ) : (
                      <LockPersonIcon className={cx("is-lock-icon")} />
                    )}
                  </td>
                  <td>{formattedDate}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Authorization;