import { auth } from "./firebase";
import {
  ApplicationVerifier,
  AuthCredential,
  ConfirmationResult,
  deleteUser,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";

interface loginWithEmailAndPasswordAPIParams {
  email: string;
  password: string;
}
export const loginWithEmailAndPasswordAPI = ({
  email,
  password,
}: loginWithEmailAndPasswordAPIParams): Promise<UserCredential> =>
  signInWithEmailAndPassword(auth, email, password).then((data) => data);

interface LoginWithPhoneNumberParams {
  phoneNumber: string;
  appVerifier: ApplicationVerifier;
}

export const loginWithPhoneNumberAPI = async (
  params: LoginWithPhoneNumberParams
): Promise<ConfirmationResult> => {
  const { phoneNumber, appVerifier } = params;
  const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );
  return confirmationResult;
};

interface VerifyUserPhoneNumberParams {
  confirmationResult: ConfirmationResult;
  verificationCode: string;
}

export const verifyUserPhoneNumberAPI = async (
  params: VerifyUserPhoneNumberParams
): Promise<UserCredential> => {
  const { confirmationResult, verificationCode } = params;
  const userCredential: UserCredential = await confirmationResult.confirm(
    verificationCode
  );
  return userCredential;
};

interface UpdateUserProfileParams {
  user: User;
  profileConfig: {
    displayName?: string | null;
    photoURL?: string | null;
  };
}

export const updateUserProfileAPI = async (
  params: UpdateUserProfileParams
): Promise<void> => {
  const { user, profileConfig } = params;
  return await updateProfile(user, profileConfig);
};

interface UpdateUserEmailParams {
  user: User;
  newEmail: string;
}

export const updateUserEmailAPI = async (
  params: UpdateUserEmailParams
): Promise<void> => {
  const { user, newEmail } = params;
  return await updateEmail(user, newEmail);
};

export const verifyUserEmailAPI = async (user: User): Promise<void> => {
  await sendEmailVerification(user);
};

interface UpdateUserPasswordParams {
  user: User;
  newPassword: string;
}

export const updateUserPasswordAPI = async (
  params: UpdateUserPasswordParams
): Promise<void> => {
  const { user, newPassword } = params;
  return await updatePassword(user, newPassword);
};

interface ResetUserPasswordParams {
  email: string;
}

export const resetUserEmailPasswordAPI = async ({
  email,
}: ResetUserPasswordParams): Promise<void> => {
  return await sendPasswordResetEmail(auth, email);
};

export const deleteUserAPI = async (user: User): Promise<void> => {
  return await deleteUser(user);
};

interface ReauthenticateParams {
  user: User;
  credential: AuthCredential;
}

export const reauthenticateAPI = async (
  params: ReauthenticateParams
): Promise<UserCredential> => {
  const { user, credential } = params;
  return await reauthenticateWithCredential(user, credential);
};

export const logoutAPI = async (): Promise<void> => {
  return await signOut(auth);
};
