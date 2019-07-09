

import { Layout, Menu, Breadcrumb, Icon,Button,Form} from 'antd';
import 'isomorphic-fetch';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './Login.css' ;
import { Link } from 'react-router-dom';
import NormalLoginForm from'./loginform';


const { Header, Content, Footer, Sider } = Layout;


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

class Login extends Component {
   state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    
    render() {
        return (
            <Layout>
                <Sider 
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >   <Button type="primary" icon="fire"  >Hi,</Button>
                    <div className="logo" />
                    <Button type="default" icon="team" className="regist_button"  ><Link to="/Register/">Login/Register</Link></Button>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">Login/Register</span>
                        </Menu.Item>
                        
                    </Menu>
                </Sider>
                <Layout>
                
                    <Header style={{ background: '#000', padding: 0 }}>
                       <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span> {/*这里实现的是点击左右拉扯的动画*/}
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>EBOOK SYSTEM</span>
                        <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </span>{/*这里实现右侧旋转logo*/}
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>Login/Register</Breadcrumb.Item>
                            
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>hello!
                        <WrappedNormalLoginForm></WrappedNormalLoginForm>
                        <Button type="default" icon="home"><Link to ="/">Back to index</Link></Button>
                        </div>
                    </Content>{/*这里是面包屑导航*/}
                    <Footer style={{ textAlign: 'center' }}>
                        EBOOK SYSTEM ©2019 Created by gogowhy
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Login; 
