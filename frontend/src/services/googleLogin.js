import axios from "axios";

/** 316802535562-3frd4qtsla2e3vg2rpqrite5b14dh6s5.apps.googleusercontent.com
 * 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
 * This is the accesstoken of the user obtained from Google
 */
const googleLogin = async (accesstoken) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/dj-rest-auth/google/",
      {
        access_token: accesstoken,
      }
    );
    console.log(res);
    return await res.status;
  };

export default googleLogin;