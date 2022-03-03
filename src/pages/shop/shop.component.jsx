import React from 'react';
import { Route } from 'react-router-dom';

import { firestore, converCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import CollectionsOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';

class ShopPage extends React.Component{
    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            converCollectionsSnapshotToMap(snapshot);
        })
    }

    render() {
        const { match } = this.props;
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

export default ShopPage;