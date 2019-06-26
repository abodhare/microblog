import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class UsersUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            posts: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputPosts = async event => {
        const posts = event.target.value
        this.setState({ posts })
    }

    handleUpdateUsers = async () => {
        const { id, name, posts } = this.state
        const arrayPosts = posts.split(',')
        const payload = { name, posts: arrayPosts }

        await api.updateUserById(id, payload).then(res => {
            window.alert(`User updated successfully`)
            this.setState({
                name: '',
                posts: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const user = await api.getUserById(id)

        this.setState({
            name: user.data.data.name,
            posts: user.data.data.posts.join(','),
        })
    }

    render() {
        const { name, posts } = this.state
        return (
            <Wrapper>
                <Title>Create User</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Posts: </Label>
                <InputText
                    type="text"
                    value={posts}
                    onChange={this.handleChangeInputPosts}
                />

                <Button onClick={this.handleUpdateUsers}>Update User</Button>
                <CancelButton href={'/users/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default UsersUpdate;