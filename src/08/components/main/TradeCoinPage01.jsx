import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Api from '../../Api';
import { Consumer as ModalConsumer } from '../../../doit-ui/Modal/context';
import Form from '../../../doit-ui/Form';
import Spacing from '../../../doit-ui/Spacing';
import Text from '../../../doit-ui/Text';
import Input from '../../../doit-ui/Input';
import InlineList from '../../../doit-ui/InlineList';
import Button from '../../../doit-ui/Button';
import moment from 'moment';

class TradeCoinPage extends PureComponent {
  handleSubmit = (values, closeModal) => {
    const { name, code } = this.props;
    const { amount, currentPrice } = values;

    const formValues = {
      code,
      name,
      totalPrice: parseInt(currentPrice) * amount,
      currentPrice: parseInt(currentPrice),
      dateTime: moment().format('YYYY/MM/DD HH:mm:ss'),
    };
    Api.post('/transactions', formValues).then(() => closeModal());
  };

  render() {
    const { name, price, type } = this.props;
    const typeName = type === 'sell' ? '판매' : '구매';
    return (
      <ModalConsumer>
        {({ closeModal }) => (
          <Form
            onSubmit={(values) => this.handleSubmit(values, closeModal)}
            initValues={{ currentPrice: price }}
          >
            <Form.Consumer>
              {({ onChange, values }) => (
                <Spacing horizontal={4} vertical={8}>
                  <Text xlarge bold>
                    {name} {typeName}
                  </Text>
                  <Spacing bottom={2}>
                    <Input
                      name="currentPrice"
                      label="금액"
                      value={values['currentPrice']}
                      onChange={onChange}
                    />
                  </Spacing>
                  <Spacing bottom={2}>
                    <Input
                      name="amount"
                      label="수량"
                      value={values['amount']}
                      onChange={onChange}
                    />
                  </Spacing>
                  <InlineList spacingBetween={1}>
                    <Button primary>{typeName}</Button>
                    <Button onPress={closeModal}>취소</Button>
                  </InlineList>
                </Spacing>
              )}
            </Form.Consumer>
          </Form>
        )}
      </ModalConsumer>
    );
  }
}

TradeCoinPage.propTypes = {
  createTransaction: PropTypes.func,
};

export default TradeCoinPage;
