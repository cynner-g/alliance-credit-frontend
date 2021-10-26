import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
export default function Login() {
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" vertical-center">
      <div className="container">
        <h1 className="mb-5 text-center">Log In</h1>
        <div class="row">
          <div className="col"></div>
          <div className="col align-self-center">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email Address</label>
              <input className="form-control" type="text" id="username" placeholder="User Name" value={userName} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input className="form-control" type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary mb-3">Login</button>
            </div>
            <Link href="/forgot-password"><a>Forgot Password</a></Link>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  )
}