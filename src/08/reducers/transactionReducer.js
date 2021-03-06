import { handle } from 'redux-pack';
import { CREATE_TRANSACTION, FETCH_TRANSACTION_LIST } from '../actions/transactionPackActions';

const initState = {
  ids: [],
  entities: {},
  loadingState: {
    [CREATE_TRANSACTION]: false,
    [FETCH_TRANSACTION_LIST]: false,
  },
  errorState: {
    [CREATE_TRANSACTION]: false,
    [FETCH_TRANSACTION_LIST]: false,
  },
  pagination: {},
};

export default (state = initState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case CREATE_TRANSACTION:
    case FETCH_TRANSACTION_LIST:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          loadingState: {
            ...prevState.loadingState,
            [type]: true,
          },
          errorState: {
            ...prevState.errorState,
            [type]: true,
          },
        }),
        success: (prevState) => {
          const { data } = payload;
          const loadingAndErrorState = {
            loadingState: {
              ...prevState.loadingState,
              [type]: false,
            },
            errorState: {
              ...prevState.errorState,
              [type]: false,
            },
          };
          if (type === FETCH_TRANSACTION_LIST) {
            const { pageNumber, pageSize } = meta || {};
            const ids = data.map((entity) => entity['id']);
            const entities = data.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity['id']]: entity,
              }),
              {},
            );
            return {
              ...prevState,
              ...loadingAndErrorState,
              ids,
              entities: {
                ...prevState.entities,
                ...entities,
              },
              pagination: {
                number: pageNumber,
                size: pageSize,
              },
              pages: {
                ...prevState.pages,
                [pageNumber]: ids,
              },
            };
          } else {
            const id = data['id'];
            return {
              ...prevState,
              ...loadingAndErrorState,
              id,
              entities: {
                ...prevState.entities,
                [id]: data,
              },
            };
          }
        },
        failure: (prevState) => {
          const { errorMessage } = payload;
          return {
            ...prevState,
            errorMessage,
            loadingState: {
              ...prevState.loadingState,
              [type]: false,
            },
            errorState: {
              ...prevState.errorState,
              [type]: true,
            },
          };
        },
      });
    default:
      return state;
  }
};
