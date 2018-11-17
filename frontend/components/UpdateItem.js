import React, { Component } from 'react'
import  { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY (
        $id: ID!
    ) {
        item(where: { id: $id }) {
            id 
            title
            description
            price
        }
    }
`
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION (
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem (
            id: $id
            title: $title
            description: $description
            price: $price
        ) {
            id
            title
            description
            price 
        }
    }
`

// render a form with title, description and price
class UpdateItem extends Component {
    state = {
        title: '',
        description: '',
        price: 0
    }

    handleChange = async (event) => {
        event.preventDefault()
        const { value, name, type } = event.target
        const val = (type === 'number') ? parseFloat(value) : value
        this.setState({
            [name]: val
        })
    }
    updateItem = async (e, updateItemMutationFunction) => {
        // we just pass the mutation function instead of handling the onSubmit inline
        e.preventDefault()
        const res = await updateItemMutationFunction({
            // inject the update variables otherwise we wont have id
            variables: {
                id: this.props.id,
                ...this.state
            }
        })
        console.log(res)
    }
    render() {
        return(
            <Query query={ SINGLE_ITEM_QUERY } variables={ {
                id: this.props.id
            }}>
                {({ data, loading }) =>{
                    if (loading) return <p>loading...</p>
                    if (!data.item) return <p>We did'nt find an item with id { this.props.id }</p>
                    return (
                    <Mutation mutation={ UPDATE_ITEM_MUTATION } variables={ this.state }>
                        { (updateItem , { loading, error }) => (
                            <Form onSubmit={ e => this.updateItem(e, updateItem) }>
                                <Error error={ error }/>
                                <fieldset>
                                    <label htmlFor="title">
                                        Title
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            defaultValue={ data.item.title }
                                            onChange={ this.handleChange }
                                        />
                                    </label>

                                    <label htmlFor="price">
                                        Price
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            defaultValue={ data.item.price }
                                            onChange={ this.handleChange }
                                        />
                                    </label>

                                    <label htmlFor="description">
                                        Description
                                        <textarea
                                            name="description"
                                            id="description"
                                            defaultValue={ data.item.description }
                                            onChange={ this.handleChange }
                                        />
                                    </label>
                                    <button type="submit">Sav{ loading? 'ing': 'e'}</button>
                                </fieldset>
                            </Form>
                        )}
                    </Mutation>
                )}}
            </Query>


        )
    }
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }