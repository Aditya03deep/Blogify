import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import {register,login} from  '../../actions/auth'

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [formData , setFormdata] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(register(formData,history)) 
        }else{
            dispatch(login(formData,history))
        }
        console.log(formData)
    }
    const handleChange = (e) => {
        setFormdata({...formData,[e.target.name]: e.target.value})
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false)
    }
    const googleSuccess= async(res)=>{
        const result = res ?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type:'AUTH',data:{result,token}});
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure=(error)=>{
        console.log(error)
        console.log("Google Sign In was unsuccessful . Try again later")
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />

                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Register' : 'Login'}
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>

                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                                    </>
                                )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                        </Grid>
                       
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? 'Register' : 'Login'}
                        </Button>
                        <GoogleLogin
                            clientId="112804869387-3jf09ag4rs13e51lloe876r4m8u3t0gc.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    variant="contained"
                                    >Google Sign In </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {
                                        isSignup ? 'Already have an account ? Login' : "Don't have an acoount ? Register"
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Typography>

            </Paper>

        </Container>
    )
}

export default Auth