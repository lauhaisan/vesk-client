import { all } from "redux-saga/effects";
import { productSaga } from "./productSaga.js";
import { userSaga } from "./userSaga";
import { listUserSaga } from "./listUserSaga";
import { advertisingSaga } from "./advertisingSaga";
import { socialMediaSaga } from "./socialMediaSaga";
export default function* rootSaga() {
  yield all([
    ...productSaga,
    ...userSaga,
    ...listUserSaga,
    ...advertisingSaga,
    ...socialMediaSaga
  ]);
}
