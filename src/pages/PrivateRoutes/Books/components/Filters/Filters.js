import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Input from "components/Forms/Input/Input";
import Select from "components/Forms/Select/Select";
import { getFilters } from "store/filters/selectors";
import { setFilter } from "store/filters/actions";
import { priceOptions } from "utils/constants";

import styles from "./Filters.module.scss";


function Filters({ actions, filters }) {

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    actions.setFilter({ name, value });
  };

  return (
    <div className={ styles.wrapper }>
      <Input
        name="search"
        value={ filters.search }
        placeholder="Search by book name"
        onChange={ handleChange }
        classes={ { input: styles.search } }
      />
      <Select
        name="price"
        value={ filters.price }
        onChange={ handleChange }
        options={ priceOptions }
        classes={ { root: styles.priceDropdown } }
      />
    </div>
  );
}

const mapStateToProps = state => ({
  filters: getFilters(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setFilter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
