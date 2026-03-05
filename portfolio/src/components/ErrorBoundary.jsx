import { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex justify-center items-center py-32 text-center">
                    <p className="text-gray-500">Something went wrong loading this section.</p>
                </div>
            )
        }
        return this.props.children
    }
}
