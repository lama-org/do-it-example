import { SET_AGE } from '../actions/cellectionActions02';
import { SET_COLLECTION } from '../actions/cellectionActions01';

const initState = {
    ids: [],
    entities: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_COLLECTION:
            const ids = payload.map((entity) => entity['id']);
            const entities = payload.reduce(
                (finalEntities, entity) => ({
                    ...finalEntities,
                    [entity['id']]: entity,
                }),
                {},
            );
            return { ...state, ids, entities };
        case SET_AGE:
            const { id, age } = payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [id]: { ...state.entities[id], age },
                },
            };
        default:
            return state;
    }
};
