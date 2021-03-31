import React from 'react'
import Loadable from 'react-loadable';
import Loading from '../component/loading/loading'




const Login = Loadable({
  loader: () => import('../view/login/login'),
  loading:Loading
}) as React.ComponentType<any>
const Layout = Loadable({
  loader: () => import('../view/layout/layout'),
  loading:Loading
}) as React.ComponentType<any>
const HomePage = Loadable({
  loader: () => import('../view/home/home'),
  loading:Loading
}) as React.ComponentType<any>

export default {
  Login,
  Layout,
  HomePage,
  Comment
}
