import App, { Container } from 'next/app'
import Page from '../components/Page'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

class Myapp extends App {
    // to get page numbers like myapp.com/sell?page=2
    // also for exposing the id in the query as a prop
    // example to edit an item we click and pass the id in the query
    // in the next page we can receive that as props.query.id
    static async getInitialProps({ Component, ctx}) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        pageProps.query = ctx.query
        return { pageProps } // expose it via props --> read next.js getInitialProps
    }
    render() {
        const { Component, apollo, pageProps  } = this.props
        return (
            <Container>
                <ApolloProvider client={ apollo }>
                    <Page>
                        <Component { ...pageProps }/>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(Myapp)