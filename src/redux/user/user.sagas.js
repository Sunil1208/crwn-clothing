import { takeLatest, put, all, call } from "redux-saga/effects";
import { googleProvider, auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { googleSignInSuccess, googleSignInFailure } from "./user.actions";
import UserActionTypes from "./user.types";

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        console.log("user ref is ", user);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data()})
        );
    } catch (error) {
        console.log("error in signinwith google is ", error)
        yield put(googleSignInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart)
    ]);
}