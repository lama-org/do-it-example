import React from 'react';
import Button from '../04/Button';
import withLoadingContextAndKey, { loadingPropTypes } from './withLoadingContextAndKey';
import PropTypes from 'prop-types';

function ButtonWithLoadingContextAndKey({ children, loading, setLoading }) {
    return <Button onPress={() => setLoading(!loading)}>{loading ? '로딩중' : children}</Button>;
}

ButtonWithLoadingContextAndKey.propTypes = {
    ...loadingPropTypes,
    children: PropTypes.string,
};

export const ButtonWithDefaultLoadingContext = withLoadingContextAndKey()(
    ButtonWithLoadingContextAndKey,
);
export const ButtonWithLoading2Context = withLoadingContextAndKey('loading2')(
    ButtonWithLoadingContextAndKey,
);
