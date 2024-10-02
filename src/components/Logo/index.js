import React from 'react'
import { Link } from 'react-router-dom';
import nameProject from '../../assets/svg/logoName.svg'
import './index.css'

export const Logo = ({ className, href, ...props }) => {
	return (
		<div className='logoCont'>
			<Link to='/' href={href} className={className ? className : "logo"} {...props}>
				<img src={nameProject} alt="name" />
			</Link>
		</div>
	);
};


