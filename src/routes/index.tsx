import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'
import RouteComponents from './components'
function getToken() {
  return sessionStorage.getItem('token')
}
const routes: RouteConfig[] = [
  {
    path: '/login',
    component: RouteComponents.Login,
    requiredAuth: false
  },
  {
    render: (props) => {
      const token = getToken()
      if(!token){
        return <Redirect to="/login" />
      }
      return <RouteComponents.Layout {...props} />
    },
    requiredAuth: true,
    routes:[
      {
        path: '/',
        exact: true,
        render: () => {
          console.log("触发了")
          return <Redirect to="/homePage" />
        }
      },
      {
        path: '/homePage',
        requiredAuth: true,
        component: RouteComponents.HomePage
      },
    ]
  },
]

export default routes