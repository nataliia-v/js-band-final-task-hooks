import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { signInUser } from "store/auth/thunks";
import { getIsLoadingUserLogin } from "store/auth/selectors";

import { ReactComponent as UserAvatar } from "images/user.svg";
import SignInForm from "./components/SignInForm/SignInForm";

import styles from "./SignIn.module.scss";

function SignIn({ actions, history, isLoadingUserLogin }) {

  const onSubmit = payload => {
    actions.signInUser(history, payload);
  };

  return (
    <div className={ styles.wrapper }>
      <UserAvatar className={ styles.userAvatar }/>
      <SignInForm
        onSubmit={ onSubmit }
        isLoadingUserLogin={ isLoadingUserLogin }
      />
    </div>
  );
}

const mapStateToProps = state => ({
  isLoadingUserLogin: getIsLoadingUserLogin(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signInUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
