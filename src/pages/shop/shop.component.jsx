import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { selectIsFetching } from '../../redux/shop/shop.selector';


import CollectionsOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    componentDidMount() {
        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync();
    }

    render() {
        const { match, isCollectionFetching } = this.props;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    // component={CollectionsOverview}
                    render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
                />
                <Route 
                    path={`${match.path}/:collectionId`}
                    // component={CollectionPage}
                    render={(props) => <CollectionsPageWithSpinner isLoading={isCollectionFetching} {...props} />}
                />
            </div>
        )
    }
};

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ShopPage);