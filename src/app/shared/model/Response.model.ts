import { Advertisement } from "./Advertisement.model";
import { Paging } from "./Paging.model";

export class Response {
    data: Array<Advertisement>;
    paging: Paging;
}