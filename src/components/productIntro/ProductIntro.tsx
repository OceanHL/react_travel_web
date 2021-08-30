/*
 * @Author: jhl
 * @Date: 2021-08-25 16:50:55
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-25 17:50:29
 * @Description:
 */
import { Typography, Carousel, Image, Table, Rate } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './ProductIntro.module.css';

interface PropsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[];
}

interface RowType {
    key: number; // 会映射给React对象【必声明】
    title: string;
    description: string | number | JSX.Element;
}

const columns: ColumnsType<RowType> = [
    {
        key: 'title',
        title: 'title',
        dataIndex: 'title',
        align: 'left',
        width: 120,
    },
    {
        key: 'description',
        title: 'description',
        dataIndex: 'description',
        align: 'center',
    },
];

const ProductIntro: React.FC<PropsType> = ({
    title,
    shortDescription,
    price,
    coupons,
    points,
    discount,
    rating,
    pictures,
}) => {
    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: '路线名称',
            description: title,
        },
        {
            key: 1,
            title: '价格',
            description: (
                <>
                    ¥
                    <Typography.Text type='danger' strong>
                        {price}
                    </Typography.Text>
                </>
            ),
        },
        {
            key: 2,
            title: '限时抢购折扣',
            description: discount ? (
                <>
                    <Typography.Text delete>¥ {price} </Typography.Text>
                    <Typography.Text type='danger' strong>
                        ¥ {discount}
                    </Typography.Text>
                </>
            ) : (
                '暂无折扣'
            ),
        },
        {
            key: 3,
            title: '领取优惠',
            description: coupons ? discount : '无优惠券可领',
        },
        {
            key: 4,
            title: '线路评价',
            description: (
                <>
                    <Rate allowHalf defaultValue={+rating} />
                    <Typography.Text style={{ marginLeft: 10 }}>{rating} 星</Typography.Text>
                </>
            ),
        },
    ];

    return (
        <div className={styles['intro-container']}>
            {/* 产品标题 */}
            <Typography.Title level={4}>{title}</Typography.Title>
            {/* 产品描述 */}
            <Typography.Text>{shortDescription}</Typography.Text>
            {/*  */}
            <div className={styles['intro-detail-content']}>
                <Typography.Text style={{ marginLeft: 20 }}>
                    &yen;<span className={styles['intro-detail-strong-text']}>{price}</span> /人起
                </Typography.Text>
                <Typography.Text style={{ marginLeft: 50 }}>
                    <span className={styles['intro-detail-strong-text']}>{rating}</span> 分
                </Typography.Text>
            </div>
            <Carousel autoplay slidesToShow={3}>
                {pictures.map((p, index) => (
                    <Image key={index} height={150} src={p} />
                ))}
            </Carousel>
            <Table<RowType>
                columns={columns}
                dataSource={tableDataSource}
                size='small'
                bordered={false}
                pagination={false}
                rowKey='key'
            />
        </div>
    );
};

export default ProductIntro;
