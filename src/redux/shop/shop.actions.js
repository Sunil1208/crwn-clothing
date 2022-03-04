import { converCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');

        dispatch(fetchCollectionStart());

        collectionRef.get()
            .then(snapshot => {
                const collectionsMap = converCollectionsSnapshotToMap(snapshot);
                dispatch(fetchCollectionSuccess(collectionsMap))
                // console.log('colection map is ', collectionsMap)
            })
            .catch(error => dispatch(fetchCollectionFailure(error.message)))
    }
}