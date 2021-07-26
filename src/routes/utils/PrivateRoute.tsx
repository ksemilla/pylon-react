import { observer } from 'mobx-react-lite';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthStore } from 'stores/auth';

type PrivateRouteProps = {
  path: RouteProps['path'];
  component?: React.ElementType;
	exact?: boolean;
	render?: any;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, render, exact, ...rest }) => {

	const authStore = useAuthStore()
	const isLogged = authStore.authStore.isLogged

	if (!isLogged) return <Redirect to="/login" />

	if (Component) {
		return <Component {...rest} />
	}
	return <Route path={path} render={render} {...rest}/>
}

export default observer(PrivateRoute)