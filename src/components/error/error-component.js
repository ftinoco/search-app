import { BadRequest } from "./400-component";
import { Unauthorized } from "./401-component";
import { Forbidden } from "./403-component";
import { MethodNotAllowed } from "./405-component";
import { TooManyRequests } from "./429-component";
import { InternalServerError } from "./500-component";

export const Error = ({code}) => {
    const ENUM_ERROR = {
        400: <BadRequest />,
        401: <Unauthorized />,
        403: <Forbidden />,
        405: <MethodNotAllowed />,
        429: <TooManyRequests />,
        500: <InternalServerError />
    } 

    return <> {ENUM_ERROR[code]} </>;
}