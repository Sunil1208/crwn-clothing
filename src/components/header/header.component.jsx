import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';

// import './header.styles.scss';

const Header = ({ currentUser, hidden, signOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='shop'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                    <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
                    :
                    <OptionLink
                        to='/signin'
                    >
                        SIGN IN
                    </OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown />
            }
        </HeaderContainer>
    )
}

//using advanced destructuring
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);