import axios from "axios";
import scss from "./Header.module.scss";
import { useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// namespace IUser {
//   interface User {
//     name: string;
//     email: string;
//     avatar: string;
//   }
// }
const api = import.meta.env.VITE_APP_URL;
const api_Url = import.meta.env.VITE_URL;

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const googleLogin = () => {
    window.open(`${api_Url}/api/v1/auth/login/google`, "_self");
  };
  const warning = () => {
    toast.warn("заполните пустые поля!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const succes = () => {
    toast.success("успешно зарегистрирован!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const allInputs = async () => {
    if (
      name.trim() ||
      lastName.trim() ||
      email.trim() ||
      password.trim() === ""
    ) {
      warning();
    } else {
      succes();
    }
    try {
      const obj = {
        email: email,
        username: name,
        last_name: lastName,
        password: password,
      };

      const response = await axios.post(`${api}/auth/users/`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };

  const OpenBtn = () => {
    setOpen(true);
  };

  return (
    <div className={scss.header}>
      <div className="container">
        <div className={scss.tags}>
          <h1>
            {" "}
            <FaMoneyBillTrendUp />
            MoneyTrace
          </h1>
          <div className={scss.tag}>
            <a href="/">о нас</a>
            <a href="/">о продукте </a>
            {/* <a href="/">кошельки</a> */}
          </div>
          <div className={scss.icons}>
            <button onClick={() => OpenBtn()} className={scss.btn1}>
              зарегистрироваться
            </button>
            <button onClick={googleLogin} className={scss.btn2}>
              войти <FaUser />
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div className={scss.modal}>
          <div className={scss.modal_content}>
            <span onClick={() => setOpen(false)} className="close">
              &times;
            </span>
            <h2>Регистрация</h2>
            <div className={scss.forms}>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Имя"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder="Фамилия"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Пароль"
              />
              <button onClick={() => allInputs()} type="submit">
                Зарегистрироваться
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
