

***What is Authentication?***

Authentication is the process of verifying the identity of a user, device, or process. It's often a prerequisite for accessing resources in an information system


Authentication  has two patterns 

- **Stateful: state or data  maintains on the server side**
- **StateLess: maintains on clientside.**


***Stateful Authentication :***

**Real World Scenario**


![image](https://github.com/pavan5yerra/nodejs/assets/53389849/e3f2675d-f135-40b1-aa39-e590f6be5afd)
![image](https://github.com/pavan5yerra/nodejs/assets/53389849/08f92b2d-2c19-48c7-86ec-cf9a56505687)


**In Computer World**


![image](https://github.com/pavan5yerra/nodejs/assets/53389849/83240bfc-d632-407f-8239-acd946f9a4c0)

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/db44727a-0ce5-4b2f-9f56-2566dd075578)

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/4e00dd96-f92f-4f74-ad5f-4ba6571c2ec1)


**Disadvantages of the stateful  approach**

- Memory intensive
- We need to manage the state of the server which is memory-intensive


**Stateless Authentication:**


![image](https://github.com/pavan5yerra/nodejs/assets/53389849/f24af511-e1c8-474e-9c17-0a02252d9e08)


- In Stateless Authentication, the state is not maintained on a server
- Instead, it uses a token mechanism  along with a signature for authentication
- Token equals encryption of (user data + signature).
- For generating tokens, we use on of the option  JWT (JSON  Web Tokens)  
- PLEASE CHECK THIS LINK  [﻿JWT](https://jwt.io/) 
- Serverless architecture uses tokens for authentication
- we should use what type of authentication based on our use case
    - If we are accessing financial services we might use stateful authentication
    - If we want to access social media sites, etc. We can use stateless authentication  like tokens

﻿

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/28911d08-cbef-4bb4-b18d-fa03996bbe3c)
![image](https://github.com/pavan5yerra/nodejs/assets/53389849/fa5cb175-00d8-4801-bfc5-867c065e9d53)



Cookie-based authentication : 

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/3ac9811b-6f5a-4863-8df3-7e8b983bbfe6)



![image](https://github.com/pavan5yerra/nodejs/assets/53389849/8dd3333a-79c6-488a-b393-293bb51c3f98)



- Each domain has separate cookies. Only cookies related specific domain will be sent on that respective request
- Cookies are only limited to browsers.

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/c8cfaa97-af5a-48f2-b855-224a5907f6d8)


***Response based token:***



- **Its user responsibility to send  token  in the header**

![image](https://github.com/pavan5yerra/nodejs/assets/53389849/5681c7f3-52e7-4fc0-aebc-18c8c0a7e147)


