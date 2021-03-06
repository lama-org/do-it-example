import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InlineList from '../../../doit-ui/InlineList';
import Button from '../../../doit-ui/Button';

class TransactionPagination extends PureComponent {
  handleNextPress = () => {
    const { requestTransactionList, pageNumber, searchParams } = this.props;
    requestTransactionList(searchParams, pageNumber + 1);
  };

  handlePrevPress = () => {
    const { requestTransactionList, pageNumber, searchParams } = this.props;
    requestTransactionList(searchParams, pageNumber - 1);
  };

  render() {
    const { loading, pageNumber, hasNext } = this.props;
    const prevDisabled = loading || pageNumber <= 1;
    const nextDisabled = loading || !hasNext;
    return (
      <InlineList align="right">
        <Button secondary disabled={prevDisabled} onPress={this.handlePrevPress}>
          이전
        </Button>
        <Button secondary disabled={nextDisabled} onPress={this.handleNextPress}>
          다음
        </Button>
      </InlineList>
    );
  }
}

TransactionPagination.propTypes = {
  hasNext: PropTypes.bool,
  requestTransactionList: PropTypes.func,
  pageNumber: PropTypes.number,
  loading: PropTypes.bool,
  searchParams: PropTypes.object,
};

export default TransactionPagination;
