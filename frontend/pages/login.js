import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Form from "@/components/Form";
import Loader from "@/components/Loader";

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

// Your web app's Firebase configuration, get it from your firebase project settings page on the General tab.
const firebaseConfig = {
  apiKey: "AIzaSyDDgmKXxSYazSfVfFlhr1SemuL3AKArIKk",
  authDomain: "restaurantapp-501e1.firebaseapp.com",
  projectId: "restaurantapp-501e1",
  storageBucket: "restaurantapp-501e1.appspot.com",
  messagingSenderId: "1096437411902",
  appId: "1:1096437411902:web:a6e747e89ce4927679e16f",
  measurementId: "G-8FF4R9J5PH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginRoute() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    const { email, password } = formData;
    if (email && password) {
      try {
        const { data } = await loginMutation({
          variables: { identifier: email, password },
        });

        if (data?.login.user) {
          setUser(data.login.user);
          Cookie.set("token", data.login.jwt);
          router.push("/");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // Now, you can use the 'user' object as needed (e.g., setUser(user)).
      console.log("Google user:", user);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <Form
      title="Login"
      buttonText="Login"
      formData={formData}
      setFormData={setFormData}
      callback={handleLogin}
      error={error}
      handleGoogleLogin={handleGoogleLogin} // Pass the handleGoogleLogin function to Form
    />
  );
}
