import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (
    <Formik
      initialValues={{
        email: 'test@test.com',
        password: '000000',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('이메일 형식이 아닙니다.')
          .required('이메일을 입력해주세요.'),
        password: Yup.string()
          .min(6, '비밀번호는 6자리 이상이어야 합니다.')
          .required('비밀번호를 입력해주세요.'),
      })}
      onSubmit={(values, { setSubmitting }) => {

        setTimeout( async () => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          try {
            const result = await dispatch(loginUser(dataToSubmit));

            if (result.payload.success) {
              window.localStorage.setItem('userId', result.payload.userId);
              props.history.push("/");
            } else {
              setFormErrorMessage('이메일과 비밀번호를 확인해주세요.')
            }
          } catch (err) {
            setFormErrorMessage('이메일과 비밀번호를 확인해주세요.')
            setTimeout(() => {
              setFormErrorMessage("")
            }, 3000);
          }}, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app" style={{ backgroundColor: '#fff'}}>

            <Title level={2}>로그인</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="이메일을 입력해주세요."
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                {/* <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >이메일 기억하기</Checkbox>
                <span className="login-form-forgot" style={{ float: 'right' }}>
                    비밀번호를 잊어버렸어요.
                </span> */}
                <div>
                  <Button type="default" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    로그인하기
                </Button>
                </div>
                Or <a href="/register">회원가입 하러가기</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


