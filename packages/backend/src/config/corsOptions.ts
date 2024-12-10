import { allowedOrigins } from "./allowedOrigins"

// type allowOrigi = {
//     allowsOrigin: string
// }
export const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin /* !origin is for postman, so can we do fetch from there without having a frontend */) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by COORS'))
        };
    },
    credentials: true,
    optionsSuccessStatus: 200
};
