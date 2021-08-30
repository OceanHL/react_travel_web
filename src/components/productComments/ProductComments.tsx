/*
 * @Author: jhl
 * @Date: 2021-08-25 18:07:48
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-26 14:45:54
 * @Description:
 */
import React from 'react';
import { Comment, List } from 'antd';

interface PropsType {
    data: {
        author: string;
        avatar: string;
        content: string;
        createDate: string;
    }[];
}

const ProductComments: React.FC<PropsType> = ({ data }) => {
    return (
        <List
            itemLayout='horizontal'
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Comment
                        // actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.createDate}
                    />
                </List.Item>
            )}
        />
    );
};

export default ProductComments;
