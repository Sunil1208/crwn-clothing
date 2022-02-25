import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ match }) => {
    const { params: { collectionId }} = match;
    console.log('categoryId is ', collectionId)
    console.log('match comlsdf is ', match)
    return (
        <div className='collection-page'>
            <h2>CATEGORY PAGE</h2>
        </div>
    )
}

export default CollectionPage;