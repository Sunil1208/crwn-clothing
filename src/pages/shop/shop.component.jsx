import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, converCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state = {
        loading: true
    }
    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = converCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            // console.log('colection map is ', collectionsMap)
            this.setState({loading: false});
        })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    // component={CollectionsOverview}
                    render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />}
                />
                <Route 
                    path={`${match.path}/:collectionId`}
                    // component={CollectionPage}
                    render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props} />}
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