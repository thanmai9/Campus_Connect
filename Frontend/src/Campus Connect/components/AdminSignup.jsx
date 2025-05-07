const AdminSignup =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async(e) => {   
    e.prevent.default();
    try{
      await fetch(`${REACT_APP_API_BASE_URL}/api/admin/signup`,{email,password});
    }
    catch(error){
    console.log(error);
    }
    
    }
    return(
    
        <div className="admin-signup">
          <h2>Admin Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Signup</button>
          </form>   
        </div>
    )
    
    }
    
    export default AdminSignup;