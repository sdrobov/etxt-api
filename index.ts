import * as crypto from "crypto";
import * as request from "request-promise-native";
import {IConfig
    , IGetTaskResultParams
    , IGetTaskResultResult
    , IListCategoriesResult
    , IListTasksParams
    , IListTasksResultItem
    , ISaveTaskParams
    , ISaveTaskResult} from "./types";

export class EtxtApi {
    private apiUrl = "https://www.etxt.biz/api/json/";
    private pass: string;
    private token: string;

    constructor(config: IConfig) {
        this.pass = config.pass;
        this.token = config.token;

        if (config.apiUrl) {
            this.apiUrl = config.apiUrl;
        }
    }

    public listCategories(): Promise<IListCategoriesResult[]> {
        return this.query<IListCategoriesResult[]>("categories.listCategories");
    }

    public saveTask(params: ISaveTaskParams): Promise<ISaveTaskResult> {
        return this.query<ISaveTaskResult>("tasks.saveTask", params);
    }

    public listTasks(params?: IListTasksParams): Promise<IListTasksResultItem[]> {
        return this.query<IListTasksResultItem[]>("tasks.listTasks", params);
    }

    public getTaskResult(params: IGetTaskResultParams): Promise<IGetTaskResultResult[]> {
        return this.query<IGetTaskResultResult[]>("tasks.getResults", params);
    }

    protected query<T>(methodName: string, params?: {}): Promise<T> {
        return request.post(this.getRequestUrl(methodName), { form: params });
    }

    protected getSignature(method: string): string {
        const hash1 = crypto.createHash("md5");
        const hash2 = crypto.createHash("md5");
        const passHash = hash2.update(this.pass + "api-pass").digest("hex");

        return hash1.update(`method=${method}token=${this.token}` + passHash).digest("hex");
    }

    protected getRequestUrl(method: string): string {
        const signature = this.getSignature(method);
        return this.apiUrl + `?token=${this.token}&method=${method}&sign=${signature}`;
    }
}

module.exports = EtxtApi;
