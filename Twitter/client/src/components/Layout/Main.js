import React from 'react';
import Header from './Header';
import Grid from '@material-ui/core/Grid';

const Main = ({ children }) => {
	return (
		<div>
			<Header />
			<Grid container justify="center">
				<Grid item xs={12} sm={6} style={{marginTop:30}}>{children}</Grid>
			</Grid>
		</div>
	);
};

export default Main;
