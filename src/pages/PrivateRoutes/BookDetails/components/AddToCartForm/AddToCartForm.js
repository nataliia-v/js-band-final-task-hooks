import React, { useState } from "react";
import classNames from "classnames";

import KeyValuePair from "components/KeyValuePair/KeyValuePair";
import Counter from "components/Forms/Counter/Counter";
import Button from "components/Button/Button";

import styles from "./AddToCartForm.module.scss";

function AddToCartForm({ price, count, classes, cartBook, onSubmit }) {

  const [totalPrice, setToalPrice] = useState(cartBook ? cartBook.totalPrice : 0);
  const [totalCount, setTotalCount] = useState(cartBook ? cartBook.totalCount : 0);

  const wrapperClass = classNames(styles.wrapper, classes.root);

  const handleCountChange = e => {
    const { value } = e.currentTarget;
    setTotalCount(value);
    setToalPrice((value * price).toFixed(2));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ totalPrice, totalCount });
  };

  return (
    <form className={ wrapperClass } onSubmit={ handleSubmit }>
      <KeyValuePair title="Price, $" value={ price }/>
      <KeyValuePair
        title="Count"
        value={
          <Counter
            name="totalCount"
            value={ totalCount }
            min={ 0 }
            max={ count }
            onChange={ handleCountChange }
          />
        }
      />
      <KeyValuePair title="Total price" value={ totalPrice }/>

      <div className={ styles.footer }>
        <Button type="submit" disabled={ !totalCount }>
          Add to cart
        </Button>
      </div>
    </form>
  );
}

export default AddToCartForm;
