import { useCookies }  from "react-cookie";

  export default () => {

    const [cookie, setCookie] = useCookies(["bearerToken", "email", "tutor"]);

    const updateCookie = (token: string, email: string, tutor: boolean) => {
    let d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));

    setCookie("bearerToken", token, {path: "/", expires: d});
    setCookie("email", email, {path: "/", expires: d});
    setCookie("tutor", tutor, {path: "/", expires: d});
    };

    const getCookie = () => {
        return cookie;
    };

    return { updateCookie, getCookie }
}