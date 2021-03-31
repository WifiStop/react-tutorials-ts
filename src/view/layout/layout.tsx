import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined,
    SettingOutlined,
    CodepenCircleOutlined,
    DownOutlined,
    ReadOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { HashRouter, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Style from './layout.module.scss'
import { layout } from './layout.interface';
import SubMenu from 'antd/lib/menu/SubMenu';
import { renderRoutes } from 'react-router-config';
const { Header, Sider, Content } = Layout;
const mapMenu: layout.meunType[] = [
    { key: 'homePage', name: '首页', iconPath: <HomeOutlined /> },
    {
        key: 'user-menu', name: '用户管理', isSubMenu: true, iconPath: <UserOutlined />, children: [
            {
                key: 'user', name: '用户列表', parentKey: 'user-menu'
            },
            {
                key: 'roles', name: '角色管理', parentKey: 'user-menu'
            }
        ]
    },
    {
        key: 'article-menu', name: '文章管理', isSubMenu: true, iconPath: <FileTextOutlined />, children: [
            {
                key: 'articles', name: '文章列表', parentKey: 'article-menu'
            },
            {
                key: 'category', name: '文章分类', parentKey: 'article-menu'
            },
            {
                key: 'comments', name: '文章评论', parentKey: 'article-menu'
            },
        ]
    },
    {
        key: 'message-menu', name: '社区管理', isSubMenu: true, iconPath: <ReadOutlined />, children: [
            { key: 'message', name: '消息中心', parentKey: 'message-menu' }
        ]
    },
    {
        key: 'setting-menu', name: '设置管理', isSubMenu: true, iconPath: <SettingOutlined />, children: [
            {
                key: 'system-setting', name: '系统设置', parentKey: 'setting-menu', isItemGroup: true, children: [
                    { key: 'website-setting', name: '网站设置', parentKey: 'system-setting' },
                    { key: 'email-service', name: '邮件服务', parentKey: 'system-setting' },
                ]
            },
            {
                key: 'my-setting', name: '我的设置', parentKey: 'setting-menu', isItemGroup: true, children: [
                    { key: 'basic-info', name: '基本资料', parentKey: 'my-setting' },
                    { key: 'modify-password', name: '修改密码', parentKey: 'my-setting' },
                ]
            },
        ]
    }


]
const writeInDom = (mapMenu: layout.meunType[]) => {
    return mapMenu.map(menu => {
        if (menu.children) {
            if (menu.isSubMenu) {
                return (
                    <SubMenu title={menu.name} key={menu.key} icon={menu.iconPath}>
                        {writeInDom(menu.children)}
                    </SubMenu>
                )
            }
            if (menu.isItemGroup) {
                return (
                    <Menu.ItemGroup key={menu.key} title={menu.name} >
                        {writeInDom(menu.children)}
                    </Menu.ItemGroup>
                )
            }
        }
        return <Menu.Item key={menu.key} icon={menu.iconPath}>{menu.name}</Menu.Item>
    })
}
const handleFindOpenMenu = (selectedKeys: string) => {
    const findMenu = mapMenu.find(subMenu => subMenu.key === selectedKeys)
    return findMenu!.parentKey as string
}
const handleBreadcrumb = (selectedKeys: string) => {
    let flatMeun: layout.meunType[] = []
    let breadcrumbList: string[] = []
    const fn = (source: layout.meunType[]) => {
        source.forEach(el => {
            flatMeun.push(el)
            if (el.children && el.children.length > 0) fn(el.children)
        })
    }
    fn(mapMenu)//数据扁平化
    const findMeun = (currentKey: string) => {
        let findData = flatMeun.find(res => res.key == currentKey)
        breadcrumbList.unshift(findData!.name)
        if (findData!.parentKey) {
            findMeun(findData!.parentKey)
        } else {
            return
        }
    }
    findMeun(selectedKeys)
    return <Breadcrumb className={Style['layout-nav']}>
        {
        breadcrumbList.map((item,index)=>
            <Breadcrumb.Item key={index}>
            {item}
            </Breadcrumb.Item>
        )
        }
     </Breadcrumb>
}
const LayoutContainer: React.FC<void> = (props) => {
    const { route } = props as any
    const history = useHistory();
    const currentPath = useLocation().pathname.substr(1)
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([currentPath])
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>(['layout'])
    const toggle = () => {
        setCollapsed(!collapsed)
    }

    const handleRouter = (meun: layout.MenuInfo) => {
        const key = meun.key as string
        setSelectedKeys([key])
        history.push(key)
    }
    return (
        <HashRouter>
            <Layout className={Style['layout-container']}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className={Style.logo} />
                    <Menu theme="dark" mode="inline"
                        selectedKeys={selectedKeys}
                        defaultOpenKeys={defaultOpenKeys}
                        onClick={handleRouter}>
                        {writeInDom(mapMenu)}
                    </Menu>
                </Sider>
                <Layout >
                    <Header className={`${Style['header-backgroud']} ${Style['layout-header']}`} style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: Style.trigger,
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className={Style['site-layout-background']}
                        style={{
                            minHeight: 280,
                        }}
                    >
                        {handleBreadcrumb(currentPath)}
                        
                        <div className={Style['layout-content--info']}>
                        {renderRoutes(route.routes)}
                        </div>
                        
                    </Content>
                </Layout>
            </Layout>
        </HashRouter>
    )
}
export default LayoutContainer

