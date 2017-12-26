import * as Promise from "bluebird";
import * as crypto from "crypto";
import * as request from "request-promise";

export interface IConfig {
    apiUrl?: string;
    pass: string;
    token: string;
}

export interface ISaveTaskResult {
    taskId?: number;
    noUtarget?: string;
    noWork?: string;
}

export enum EBool {
    No = 0,
    Yes = 1,
}

export enum ESaveTaskParamsPriceType {
    Per1000Signs = 1,
    PerTask = 2,
}

export enum ESaveTaskParamsTaskVisibility {
    All = 1,
    Whitelist = 2,
    Individual = 3,
}

export interface ISaveTaskParams {
    id?: number;
    public?: EBool;
    title: string;
    description?: string;
    text?: string;
    price: number;
    price_type?: ESaveTaskParamsPriceType;
    uniq?: number;
    whitespaces?: EBool;
    only_stars?: EBool;
    size?: number;
    checksize?: EBool;
    deadline?: string;
    timeline?: string;
    auto_work?: EBool;
    auto_rate?: number;
    auto_reports?: number;
    auto_reports_n?: number;
    auto_level?: number;
    id_category: number;
    multitask?: EBool;
    multicount?: number;
    id_folder?: number;
    target_task?: ESaveTaskParamsTaskVisibility;
    id_target?: number;
    keywords?: string;
    language_from?: number;
    language_to?: number;
    bwgroup_send?: EBool;
}

export default class EtxtApi {
    private apiUrl = "https://www.etxt.ru/api/json/";
    private pass: string;
    private token: string;

    constructor(config: IConfig) {
        this.pass = config.pass;
        this.token = config.token;

        if (config.apiUrl) {
            this.apiUrl = config.apiUrl;
        }
    }

    public saveTask(params: ISaveTaskParams): Promise<ISaveTaskResult> {
        const methodName = "tasks.saveTask";

        return request.post(this.getRequestUrl(methodName), { body: params }).then((response: ISaveTaskResult) => {
            return Promise.resolve(response);
        });
    }

    protected getSignature(method: string): string {
        const hash1 = crypto.createHash("md5");
        const hash2 = crypto.createHash("md5");

        return hash1.update(
            `method=${method}token=${this.token}`
            + hash2.update(this.pass + "api-pass").digest("hex")
        ).digest("hex");
    }

    protected getRequestUrl(method: string): string {
        const signature = this.getSignature(method);
        return this.apiUrl + `?token=${this.token}&method=${method}&sign=${signature}`;
    }
}