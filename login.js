import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import {CognitoUser,AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import {setsedata} from './sessonstate';
import {setSignedIn} from '../sharedScreens/home';


const region = "us-east-1";
const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
export  function login(mail, password,navi){
   
    const user = new CognitoUser({
        Username: mail,
        Pool: UserPool,
      });
      
      const authDetails = new AuthenticationDetails({
        Username: mail,
        Password: password,
      });
      
       user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
          console.log("neeeeeeeeeeee: ", data.idToken.payload["cognito:username"]);

          setsedata(data.idToken.jwtToken,mail,data.idToken.payload["cognito:username"],data.idToken.payload["phone_number"])
          setSignedIn(true);
        
         
          
         
          navi();
          
          
          
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
          
          
          
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
         
        },
      });
      
  }