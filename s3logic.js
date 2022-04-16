import { S3Client, AbortMultipartUploadCommand, PutObjectCommand,GetObjectCommand, S3,HeadObjectCommand,DeleteObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fromCognitoIdentityPool,FromCognitoIdentity } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import type {Readable} from 'stream'



const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const region = "us-east-1";

export async function uploadtos3(signintoken, file, callbackfn, owneremailaddress, lostchildid, imgid, Bucket) {


    const s3 = new S3Client({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
            logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5': signintoken,
            }
        }),

    });

    const uploadParams = {
        Bucket: Bucket,
        Key: imgid,
        Body: file,
        Metadata: {
            owner: owneremailaddress,
            lostchildid: lostchildid,
            imgid: imgid,
        },


    }
    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log("Success", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
}
export async function uploadarrtos3(signintoken,file,owneremailaddress,uid,lostchildid,address,phone,Bucket) {
    
    const s3 = new S3Client({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
            logins: {
                "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
            },
        }),
    });
    var success=true;
    for (let i = 0; i < Object.keys(file).length; i++) {
        console.log(Object.keys(file).length);
        console.log(file[i]);
        
        const uploadParams = {
            Bucket: Bucket,
            Key: uid+lostchildid+i,
            Body: file[i],
            Metadata: {
                owner: owneremailaddress,
                lostchildid: lostchildid,
                imgid: uid+lostchildid+i,
                address:address,
                phonenumber:phone
            },
        };
        try {
            const data = await s3.send(new PutObjectCommand(uploadParams));
            console.log("Success", data);
        } catch (err) {
            console.log("Error", err);
            success=false;
        }
    }
    return success;
}
export async function uploadarrtos3passerby(file,lat,lng,address,name,phoneNumber,filename,Bucket) {
    
    const s3 = new S3Client({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
           
        }),

    });

    const uploadParams = {
        Bucket: Bucket,
        Key: filename,
        Body: file,
        Metadata: {
            name: name,
            lng: lng,
            lat:lat,
            phoneNumber: phoneNumber,
            writenaddress:address
        },
        


    }
    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log("Success", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
}
}
export async function gets3files(signintoken, id, callbackfn, Bucket) {
     const s3 = new S3({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
            logins: {
                "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
            },
        }),
    });


   

    const uploadParams = {
        Bucket: Bucket,
        Key: id,



    }

    try {
        const command =new GetObjectCommand(uploadParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
        
        return url;
        
        console.log("Success");
        
    } catch (err) {
        console.log("Error", err);
    }

    





}
export async function gets3fileheadobject( id, callbackfn, Bucket) {
    const s3 = new S3Client({
       region: region,
       credentials: fromCognitoIdentityPool({
           client: new CognitoIdentityClient({ region: region }),
           identityPoolId: identitypoolid,
           
       }),
   });


  

   const Params = {
       Bucket: Bucket,
       Key: id,
   }

   try {
       
       const command = new HeadObjectCommand(Params);
       const response = await s3.send(command);
       console.log("asdaasdasdasdasdasd",response);
        return response

       
       console.log("Success");
    } 
        
    catch (err)
     {
       console.log("Error", err);
    }

   





}

export async function gets3file(signintoken, id, callbackfn, Bucket) {
    const s3 = new S3({
       region: region,
       credentials: fromCognitoIdentityPool({
           client: new CognitoIdentityClient({ region: region }),
           identityPoolId: identitypoolid,
           logins: {
               "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
           },
       }),
   });


  

   
   var uriarr=[]
   for (let i = 0; i < id.length; i++)
   {
    try {
        const uploadParams = {
            Bucket: Bucket,
            Key: id[i],
     
     
     
        }
        const command =new GetObjectCommand(uploadParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
       
        uriarr.push(url);
        
        console.log("Success");
        
    } catch (err) {
        console.log("Error", err);
    }
 

    }
    return uriarr;

}

export async function gets3filepasserby(id, callbackfn, Bucket) {
    const s3 = new S3({
       region: region,
       credentials: fromCognitoIdentityPool({
           client: new CognitoIdentityClient({ region: region }),
           identityPoolId: identitypoolid,
           
       }),
   });


  

   
   var uriarr=[]
   for (let i = 0; i < id.length; i++)
   {
    try {
        const uploadParams = {
            Bucket: Bucket,
            Key: id[i],
     
     
     
        }
        const command =new GetObjectCommand(uploadParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
       
        uriarr.push(url);
        
        console.log("Success");
        
    } catch (err) {
        console.log("Error", err);
    }
 

    }
    return uriarr;

  
   





}
export async function Deleteobject(signintoken,oid,Bucket) {
    
    const s3 = new S3Client({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
            logins: {
                "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
            },
        }),
    });
    const Params = {
        Bucket: Bucket,
        Key: oid
    };
    try {
        const data = await s3.send(new DeleteObjectCommand(Params));
        console.log("Success", data);
    } catch (err) {
        console.log("Error", err);
    }
    return true;
}
export  function linktoid(link) {
    var output = link.substring(54,link.indexOf('?'));
    return output
    
    
}

export async function Deleteobjects(signintoken,oid,Bucket) {
    
    const s3 = new S3Client({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
            logins: {
                "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
            },
        }),
    });
    var success=true;
    for (let i = 0; i < oid.length; i++)
    {
        const Params = {
            Bucket: Bucket,
            Key: oid[0]
        };
        try {
            const data = await s3.send(new DeleteObjectCommand(Params));
            console.log("Success", data);
        } catch (err) {
            console.log("Error", err);
            success=false;
        }

    }
    
    return success;
}

