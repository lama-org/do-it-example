import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../04/Button';

class ActionComponent extends Component {
    render() {
        const { setLoading, resetLoading, setUser, setCollection, setAge } = this.props;
        const collection = [
            {
                id: 21,
                name: 'John',
                age: 20,
            },
            {
                id: 2,
                name: 'Justin',
                age: 40,
            },
            {
                id: 3,
                name: 'Mary',
                age: 21,
            },
        ];
        return (
            <>
                <Button onPress={() => setLoading(true)}>setLoading</Button>
                <Button onPress={() => resetLoading()}>resetLoading</Button>
                <Button onPress={() => setCollection(collection)}>setCollection</Button>
                <Button onPress={() => setUser({ name: 'Park', age: 20 })}>setUser</Button>
                <Button onPress={() => setAge(2, 55)}>setAge</Button>
            </>
        );
    }
}

ActionComponent.propTypes = {
    setAge: PropTypes.func,
    setLoading: PropTypes.func,
    resetLoading: PropTypes.func,
    setCollection: PropTypes.func,
    setUser: PropTypes.func,
};

export default ActionComponent;
