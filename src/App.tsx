import React, { useEffect, useState } from 'react';
import './App.css';
import requestAxios from './axios';
import { Input, Button, Form, Modal } from 'antd';
import Cookies from 'universal-cookie';

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  const [paid, setPaid] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  type FieldTypeRegister = {
    username?: string;
    password?: string;
    remember?: string;
    email?: string;
  };
  let cookie = new Cookies();

  const fetchlogin = async (values: any) => {
    await requestAxios
      .post('api/login', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const headers = new Headers();
        headers.set( 'Authorization', `Bearer ${res.data.access}`)
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        cookie.set('access', res.data.access);
        cookie.set('refresh', res.data.refresh);
        setCurrentUser(true);
        setPaid(res.data.user?.paid);
      })
      .catch((err) => {
        console.log('L0i', err);
      });
  };
  const fetchRegister = async (values: any) => {
    await requestAxios
      .post('api/register', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        window.location.reload();
        // setCurrentUser(false);
      })
      .catch((err) => {
        console.log('L0i', err);
      });
  };
  const fetchLogout = async () => {
    await requestAxios
      .post('api/logout', {
        refresh: cookie.get('refresh'),
      })
      .then((res) => {
        setCurrentUser(false);
        cookie.remove('access');
        cookie.remove('refresh');
      })
      .catch((err) => {
        console.log('L0i', err);
      });
  };

  const fetchBuy = async (values: any) => {
    const access = cookie.get('access');
    await requestAxios
      .get('api/pay', {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((res) => {})
      .catch((err) => {
        console.log('L0i', err);
      });
  };

  const feltchUser = async () => {
    // let cookie = new Cookies();
    const access = cookie.get('access');
    if (access) {
      await requestAxios
        .get('api/getuser', { headers: { Authorization: `Bearer ${access}` } })
        .then((res) => {
          setCurrentUser(true);
          setPaid(res.data?.paid);
          console.log(res.data);
        })
        .catch((err) => {
          console.log('LOI', err);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    feltchUser();
    // feltchTest();
  }, []);

  return (
    <div className="App ">
      <header className="App-header">Payment</header>
      <div className="	with-full pt-[100px] flex justify-center items-center">
        {currentUser ? (
          <div>
            <div
              className={`${
                paid ? 'text-emerald-600' : 'text-stone-500'
              } mb-[100px] text-3xl`}
            >
              {paid ? 'Bạn đã thanh toán' : 'Bạn chưa thanh toán'}
            </div>

            <Button
            href="http://localhost:8000/api/pay"
            //  onClick={fetchBuy}
             >
              Thanh toán
            </Button>
            <Button
              onClick={fetchLogout}
              style={{ backgroundColor: 'blue' }}
              type="primary"
              htmlType="submit"
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="p-[100px] rounded bg-zinc-400 with-fit">
            {showLoginForm ? (
              <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ border: 'none', boxShadow:'none' }}
                initialValues={{ remember: true }}
                onFinish={(values) => fetchlogin(values)}
                onFinishFailed={undefined}
                autoComplete="off"
                className=""
              >
                <Form.Item<FieldType>
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                  <Button
                    style={{ backgroundColor: 'blue' }}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 'fit-content' }}
                initialValues={{ remember: true }}
                onFinish={(values) => fetchRegister(values)}
                onFinishFailed={undefined}
                autoComplete="off"
                className=""
              >
                <Form.Item<FieldTypeRegister>
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldTypeRegister>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldTypeRegister>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    style={{ backgroundColor: 'blue' }}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}

            <div
              onClick={() => setShowLoginForm(!showLoginForm)}
              style={{ color: 'blue' }}
            >
              {showLoginForm ? 'Register' : 'Login'}
            </div>

            {/* <Input onChange={e=>setUserName(e.target.value)} value={username} placeholder="username" />
            <Input onChange={e=>setPassword(e.target.value)} value={password} placeholder="password" />
            <Button onClick={fetchlogin} type="primary">
              Login
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
