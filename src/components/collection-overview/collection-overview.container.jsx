import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from './collection-overview.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetching
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner,
)(CollectionOverview);


export default CollectionOverviewContainer;