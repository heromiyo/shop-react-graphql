import App, { Container } from 'next/app'
import Page from '../components/Page'

class Myapp extends App {
    render() {
        const { Component } = this.props
        return (
            <div>
                <Page>
                    <Component/>
                </Page>
            </div>
        )
    }
}

export default Myapp