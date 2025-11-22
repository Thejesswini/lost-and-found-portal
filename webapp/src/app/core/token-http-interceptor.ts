import { HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor:HttpInterceptorFn = (req, next) => {
    console.log("Interceptor WORKING. Request URL:", req.url);
    
    const token = localStorage.getItem("token");
    console.log("token in interceptor:", token);
    if (token){
        req = req.clone({
            setHeaders: {
                Authorization: token,
            },
        });
    }
    return next(req);
};
