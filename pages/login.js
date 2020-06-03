import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import userApi from "../services/user-api";
import styles from './Auth-form.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submited");
  }

  return (
    <Layout title="Login">
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>quantum ecommerce</h1>
        <form onSubmit={handleSubmit}>
          <h3 className={styles.formTitle}>login</h3>
          <div className={styles.inputs}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
          <Link href="/signup">
            <a className={styles.switchForm}>I don't have a account</a>
          </Link>
        </form>
      </div>
    </Layout>
  );
}
