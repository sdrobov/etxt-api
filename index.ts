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
        return this.query("categories.listCategories")
            .then((result: string) => {
                const categories: IListCategoriesResult[] = [];
                try {
                    result = JSON.parse(result);
                } catch (e) {
                    return Promise.reject(`cant parse result: ${result}`);
                }

                Object.keys(result).forEach(idx => {
                    categories.push(result[idx]);
                });

                return Promise.resolve(categories);
            });
    }

    public saveTask(params: ISaveTaskParams): Promise<ISaveTaskResult> {
        return this.query("tasks.saveTask", params)
            .then((result: string) => {
                let parsedResult: ISaveTaskResult = {};
                try {
                    parsedResult = JSON.parse(result) as ISaveTaskResult;
                } catch (e) {
                    return Promise.reject(`cant parse result: ${result}`);
                }

                return Promise.resolve(parsedResult);
            });
    }

    public listTasks(params?: IListTasksParams): Promise<IListTasksResultItem[]> {
        return this.query("tasks.listTasks", params)
        .then((result: string) => {
            const tasks: IListTasksResultItem[] = [];
            try {
                result = JSON.parse(result);
            } catch (e) {
                return Promise.reject(`cant parse result: ${result}`);
            }

            Object.keys(result).forEach(idx => {
                tasks.push(result[idx]);
            });

            return Promise.resolve(tasks);
        });
    }

    public getTaskResult(params: IGetTaskResultParams): Promise<IGetTaskResultResult[]> {
        return this.query("tasks.getResults", params)
        .then((result: string) => {
            const taskResults: IGetTaskResultResult[] = [];
            try {
                result = JSON.parse(result);
            } catch (e) {
                return Promise.reject(`cant parse result: ${result}`);
            }

            Object.keys(result).forEach(idx => {
                taskResults.push(result[idx]);
            });

            return Promise.resolve(taskResults);
        });
    }

    protected query(methodName: string, params?: {}): Promise<any> {
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
