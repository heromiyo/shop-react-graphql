import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Head from 'next/head'

const SingleItemStyle = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
`

const SINGLE_ITEM_QUERY = gql`
 query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
        id
        title
        description
        largeImage 
    }
 }
`
class SingleItem extends Component {
    render() {
        return (
            <Query query={ SINGLE_ITEM_QUERY } variables={{
                id: this.props.id
            }}>
                {( { error, loading, data }) => (
                    <SingleItemStyle>

                        <Head>
                            <title> Shop | { data.item.title }</title>
                        </Head>
                        <img src={ data.item.largeImage } alt={ data.item.title }/>
                    </SingleItemStyle>
                ) }
            </Query>
        )
    }
}
export default SingleItem