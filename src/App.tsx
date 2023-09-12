import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import requestAxios from './axios';
import { Input, Button } from 'antd';
import Cookies from 'universal-cookie';

function App() {
  const [currentUser, setCurrentUser]=useState(false);
  const [paid, setPaid]=useState(false);

  let data = new FormData();
    data.append('username','trung');
    data.append('password','trung');
  
  const fetchlogin= async()=>{
    await requestAxios.post('api/login',data,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    }).then(res=>{
      let cookie =new Cookies();
      cookie.set('access_token',res.data.access_token);
      setCurrentUser(true)
    }).catch(err=>{
      console.log('L0i',err)
    });
  }
  const feltchApi= async()=>{
      await requestAxios.get('api/user')
      .then(res=>{
        setCurrentUser(true);
        setPaid(res.data.user?.paid)
      })
      .catch(err=>{
        console.log('LOI',err)
      });
    }
    
  useEffect(()=>{
    
    feltchApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Payment
      </header>
      <div>
      {currentUser?<div>

        <Button href='http://127.0.0.1:8000/api/test'>Buy</Button>
      </div>:<div className='w-[200px]'>
        <Input placeholder='username'/>
        <Input placeholder='password'/>
        <Button onClick={fetchlogin} type="primary">Login</Button>
      </div>}
      </div>
    </div>
  );
}

export default App;
