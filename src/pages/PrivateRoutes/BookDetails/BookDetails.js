import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBook } from 'store/books/thunks';
import { addBookToCart } from 'store/cart/actions';
import { getBooksIsLoading, getBookById } from 'store/books/selectors';
import { addToastThunk } from 'store/layout/thunks';
import { getCartBookById } from 'store/cart/selectors';
import Spinner from 'components/Spinner/Spinner';
import AddToCartForm from './components/AddToCartForm/AddToCartForm';

import styles from './BookDetails.module.scss';

function BookDetails({book, cartBook, isLoading, match, history,
                       match: {
                         params: { id }
                       },
                       actions}) {

/// Fetch Book
  useEffect(() => {
    actions.fetchBook(history, { id });
  },[match.params.id, actions, history, id]);

  if (isLoading) {
      return <Spinner />;
    }

   const onSubmit = payload => {
    actions.addBookToCart({ ...payload, ...book });
    actions.addToastThunk({
      message: `${book.title} has been added to the cart.`
    });
  };

  return (
    <div className={styles.bookWrap}>
            {book && (
          <div key={book.id}>
            <div className={styles.book}>
              <img className={styles.img} src={book.cover} alt="book" />
              <div className={styles.bookInfo}>
                <h5 className={styles.title}>Book name: {book.title}</h5>
                <p className={styles.info}>Author: {book.author}</p>
                <p className={styles.info}>Level: {book.level}</p>
                <div className={styles.info}>
                  <span>Tags: </span>
                  {book.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <AddToCartForm
                {...book}
                cartBook={cartBook}
                classes={{ root: styles.cartForm }}
                onSubmit={onSubmit}
              />
            </div>
            <p>Description: {book.description}</p>
          </div>
        )}
      </div>
  );
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { id }
    }
  }
) => ({
  book: getBookById(state, id),
  cartBook: getCartBookById(state, id),
  isLoading: getBooksIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { fetchBook, addBookToCart, addToastThunk },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
