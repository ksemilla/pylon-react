import { verify } from 'api/auth';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';

type PrivateRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
	exact?: boolean;
};

const PublicRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {

	const authStoreProvider = useAuthStore()
	const authStore = authStoreProvider.authStore
	const history = useHistory()

	useEffect(()=>{
		if (!authStore.isLogged) {
			const token = localStorage.getItem('access')
			if (token) {
				verify(token)
				.then(res=>{
					authStore.login(res.data)
					history.push("/")
				})
				.catch(res=>{
					console.log("[ERROR]", res.response)
				})
			}
		}
	}, [authStore, history])
	
  return (
    <Route
      {...rest}
      render={props =>
      	authStore.isLogged ? <Redirect to={{ pathname: "/" }}/> : <Component {...props} />
      }
    />
  )
}

export default observer(PublicRoute)