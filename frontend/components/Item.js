import React, { Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Title from './styles/Title'
import ItemStyle from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import formatMoney  from '../lib/formatMoney'

class Item extends Component {
    static propTypes = {
        item: PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.string,
            largeImage: PropTypes.string,
            price: PropTypes.number.isRequired
        })
    }

    render() {
        const { item } = this.props
        return (
            <ItemStyle>
                { item.image && <img src={item.image} alt={item.title} />}
                <Title>
                    <Link href={ {
                        pathname: '/items',
                        query: { id: item.id }
                    }}>
                        <a>{ item.title }</a>
                    </Link>
                </Title>
                <PriceTag>
                    { formatMoney(item.price) }
                </PriceTag>
                <p>{ item.description }</p>
                <div className="buttonList">
                    <Link href={ {
                        pathname: 'update',
                        query: { id: item.id }
                    }}>
                        <a>Edit</a>
                    </Link>
                </div>
                <button>Add to Cart</button>
                <button>Delete</button>
            </ItemStyle>
        )
    }
}

export default Item