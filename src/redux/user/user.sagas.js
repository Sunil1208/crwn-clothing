import { takeLatest, put, all, call } from "redux-saga/effects";
import { googleProvider, auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure } from "./user.actions";
import UserActionTypes from "./user.types";

export function* getSnapShotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()})
        );
    } catch (error) {
        console.log("error in signin is ", error)
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        console.log("error in signinwith google is ", error)
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({ payload }) {
    const { email, password } = payload;
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
    ]);
}