import React from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../../_actions/user_actions";

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const logoutHandler = async() => {

    const resultLogout = await dispatch(logoutUser());

    if (resultLogout.payload.success) {
        window.location.replace("/"); // 로그아웃시 새로고침. 히스토리 기록되지 않음.
        localStorage.removeItem('userId');
        props.onClose();
    } else {
        alert('로그아웃을 실패하였습니다.')
    }

  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail"  onClick={props.onClose}>
          <Link to="/login">로그인</Link>
        </Menu.Item>
        <Menu.Item key="app"  onClick={props.onClose}>
          <Link to="/register">회원가입</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <Link onClick={logoutHandler} >로그아웃</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

