import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function LeftMenu(props) {

  return (
    <Menu mode={props.mode}>
      <Menu.Item danger key="favorite" onClick={props.onClose}>
        <Link to="/favorite">보고싶어요</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu