import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item danger key="favorite">
      <a href="/favorite">보고싶어요</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu