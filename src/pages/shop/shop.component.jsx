import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionStart } from '../../redux/shop/shop.actions';

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';
// import { fetchCollectionsStart } from '../../redux/shop/shop.saga';

class ShopPage extends React.Component{
    componentDidMount() {
        const { fetchCollectionStart } = this.props;
        fetchCollectionStart();
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component={CollectionOverviewContainer}
                />
                <Route 
                    path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                />
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionStart: () => dispatch(fetchCollectionStart())
});

export default connect(
    null,
    mapDispatchToProps
) (ShopPage);