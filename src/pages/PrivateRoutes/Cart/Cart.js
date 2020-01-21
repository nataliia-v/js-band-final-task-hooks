import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "components/Button/Button";
import Table from "components/Table/Table";
import { cartPurchase } from "store/cart/thunks";
import { getCartBooks } from "store/cart/selectors";

import EmptyState from "./EmptyState/EmptyState";
import cartTableColumns from "./cartTableColumns";

import styles from "./Cart.module.scss";


function Cart({ cartBooks, actions }) {

  const onPurchase = () => {
    actions.cartPurchase();
  };

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.btnWrapper }>
        <Button disabled={ !cartBooks.length } onClick={ onPurchase }>
          Purchase
        </Button>
      </div>
      { cartBooks.length ? (
        <Table columns={ cartTableColumns } data={ cartBooks }/>
      ) : (
        <EmptyState/>
      ) }
    </div>
  );
}

const mapStateToProps = state => ({
  cartBooks: getCartBooks(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ cartPurchase }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
