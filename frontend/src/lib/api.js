import axios from "axios";

export const checkTokenIsValid = () => {
    const getUser = async(currentToken) => {
        try{
          const result = await axios.get('/auth/api/user', {
            headers : {'Authorization' : `Token ${currentToken}`}
          });
          console.log(result);
    
          return result.data.userid;
        } catch (e) {
          console.log(e);
        }
      }
    
      //유저 검증
      const checkUserIsValid = () => {
        const currentUser = sessionStorage.getItem('userid');
        const currentToken = sessionStorage.getItem('token');
        
        getUser(currentToken).then(userid => {
          if (currentUser === userid) {
            console.log('equal');
            return true;
          }
        });
      }
}