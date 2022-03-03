import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, converCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import CollectionsOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component{
    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = converCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            // console.log('colection map is ', collectionsMap)
        })
    }

    render() {
        const { match, } = this.props;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component={CollectionsOverview}
                />
                <Route 
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
}) 

export default connect(
    null,
    mapDispatchToProps
) (ShopPage);