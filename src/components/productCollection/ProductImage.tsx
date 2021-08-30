/*
 * @Author: jhl
 * @Date: 2021-08-20 15:30:39
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-24 10:37:37
 * @Description:
 */
import React from 'react';
import { Image, Typography } from 'antd';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

interface PropsType extends RouteComponentProps {
    id: string | number;
    size: 'large' | 'small';
    imageSrc: string;
    price: number | string;
    title: string;
}

const ProductImageComponent: React.FC<PropsType> = ({
    id,
    size,
    imageSrc,
    price,
    title,
    history,
    location,
    match,
}) => {
    console.log('history', history);
    console.log('location', location);
    console.log('match', match);
    return (
        <Link to={`detail/${id}`}>
            {size === 'large' ? (
                <Image src={imageSrc} height={285} width={490} />
            ) : (
                <Image src={imageSrc} height={120} width={240} />
            )}
            <div>
                <Typography.Text type='secondary'>{title.slice(0, 25)}</Typography.Text>
                <Typography.Text type='danger' strong>
                    &yen; {price} 起
                </Typography.Text>
            </div>
        </Link>
    );
};

export default withRouter(ProductImageComponent);
