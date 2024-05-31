

**What is Authentication? **

Authentication is the process of verifying the identity of a user, device, or process. It's often a prerequisite for accessing resources in an information system



Authentication  has two patterns 

- **Stateful: state or data  maintains on the server side**
- **StateLess: maintains on clientside.**


**Stateful Authentication : **

****

**Real World Scenario**



![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/VMRkpZtKv8PzctC-Yt6PX.png?ixlib=js-3.7.0 "image.png")





![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/ovdNLJ0ebaZPgBVkg4AkL.png?ixlib=js-3.7.0 "image.png")





**In Computer World**



![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/YFrJIieE5UtHktaQRS9ou.png?ixlib=js-3.7.0 "image.png")





![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/nP0abWYzG9GcHkUOc123k.png?ixlib=js-3.7.0 "image.png")







![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/XlXBvLeKuvzc5slg7PgI0.png?ixlib=js-3.7.0 "image.png")







**Disadvantages of the stateful  approach**

- Memory intensive
- We need to manage the state of the server which is memory-intensive






**Stateless Authentication :**





![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/xiZxKe1kUA73gf86dMbWF.png?ixlib=js-3.7.0 "image.png")





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



![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/33fz88a7WhdnT86Fdi1tW.png?ixlib=js-3.7.0 "image.png")





![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/-kJo9QkbgDVQRLB1WjuzP.png?ixlib=js-3.7.0 "image.png")





Cookie-based authentication : 



![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/lWx_fImovatE7G3kuQOlI.png?ixlib=js-3.7.0 "image.png")





![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/NHeyTHlTCGLR35_Iy92uZ.png?ixlib=js-3.7.0 "image.png")





- Each domain has separate cookies. Only cookies related specific domain will be sent on that respective request
- Cookies are only limited to browsers.


![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/lCWXpaylZyZRAg4ODVTGr.png?ixlib=js-3.7.0 "image.png")





**Response based token  : **



- **Its user responsibility to send  token  in the header**


![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/J0ZDK4nDSHS59SwzLehlJ.png?ixlib=js-3.7.0 "image.png")



